import { useState, useEffect, useRef } from 'react';
import { CHAT_AUTO_SCROLL_LIMIT } from '@constants/size';
import type { Message, ChatData } from '@type/chat';
import type { UserInformation } from '@type/user';

interface useChatScrollProps {
	userStatus: UserInformation | undefined;
	chatHistory: ChatData | null;
	setChatHistory: React.Dispatch<React.SetStateAction<ChatData | null>>;
	chatRef: React.RefObject<HTMLDivElement>;
	prevHeight: number;
}

const useChatScroll = (props: useChatScrollProps) => {
	const { userStatus, chatHistory, setChatHistory, chatRef, prevHeight } =
		props;
	const messageEndRef = useRef<HTMLInputElement | null>(null);
	const [isScrollAtBottom, setIsScrollAtBottom] = useState(false);
	const [initialLoad, setInitialLoad] = useState(true);
	const [isLatestMessageVisible, setIsLatestMessageVisible] = useState(false);

	useEffect(() => {
		if (!chatHistory || chatHistory.chatChannelMessages.length === 0) return;

		if (isScrollAtBottom) {
			messageEndRef.current?.scrollIntoView();
			setIsScrollAtBottom(false);
		} else if (chatRef.current)
			window.scrollTo({ top: chatRef.current.scrollHeight - prevHeight });
	}, [chatHistory]);

	useEffect(() => {
		const observedElement = chatRef.current;
		const resizeObserver = new ResizeObserver(() => {
			if (initialLoad) {
				messageEndRef.current?.scrollIntoView();
				setInitialLoad(false);
			}
		});

		if (observedElement) resizeObserver.observe(observedElement);

		return () => {
			if (observedElement) resizeObserver.unobserve(observedElement);
		};
	}, []);

	useEffect(() => {
		const scrollElement = chatRef.current;
		let ticking = false;

		const handleScroll = () => {
			if (!ticking && scrollElement) {
				requestAnimationFrame(() => {
					const isBottom =
						scrollElement.scrollHeight -
							scrollElement.scrollTop -
							scrollElement.clientHeight <=
						CHAT_AUTO_SCROLL_LIMIT;

					if (isBottom) setIsLatestMessageVisible(false);
					ticking = false;
				});

				ticking = true;
			}
		};

		scrollElement?.addEventListener('scroll', handleScroll);

		return () => {
			scrollElement?.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const handleLatestMessageClick = () => {
		setIsLatestMessageVisible(false);
		messageEndRef.current?.scrollIntoView();
	};

	const handleCheckScroll = (parsedMessage: Message) => {
		if (userStatus) {
			const isAutoScroll =
				chatRef.current &&
				chatRef.current.scrollHeight -
					chatRef.current.clientHeight -
					chatRef.current.scrollTop <=
					CHAT_AUTO_SCROLL_LIMIT;

			if (parsedMessage.author.id !== userStatus.profile.userId) {
				if (isAutoScroll) {
					if (parsedMessage.type === 'TEXT') setIsScrollAtBottom(true);
					else {
						setTimeout(() => {
							messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
						}, 500);
					}
				} else setIsLatestMessageVisible(true);
			} else {
				setIsLatestMessageVisible(false);
				if (parsedMessage.type === 'TEXT') setIsScrollAtBottom(true);
			}

			setChatHistory((prevChatHistory) => ({
				chatChannelMessages: [
					parsedMessage,
					...(prevChatHistory?.chatChannelMessages ?? []),
				],
			}));
		}
	};

	return {
		isLatestMessageVisible,
		messageEndRef,
		handleLatestMessageClick,
		handleCheckScroll,
	};
};

export default useChatScroll;
