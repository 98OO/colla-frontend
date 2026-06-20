import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CHAT_AUTO_SCROLL_LIMIT } from '@constants/size';
import type { Message, ChatData } from '@type/chat';
import type { UserInformation } from '@type/user';

interface useChatScrollProps {
	userStatus: UserInformation | undefined;
	chatHistory: ChatData | null;
	chatRef: React.RefObject<HTMLDivElement>;
	setChatHistory: React.Dispatch<React.SetStateAction<ChatData | null>>;
}

const useChatScroll = (props: useChatScrollProps) => {
	const { userStatus, chatHistory, setChatHistory, chatRef } = props;
	const [isScrollAtBottom, setIsScrollAtBottom] = useState(false);
	const [isInitialScrollComplete, setIsInitialScrollComplete] = useState(false);
	const [isLatestMessageVisible, setIsLatestMessageVisible] = useState(false);
	const messageEndRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!chatHistory || chatHistory.chatChannelMessages.length === 0 || !isScrollAtBottom) {
			return;
		}

		messageEndRef.current?.scrollIntoView();
		setIsScrollAtBottom(false);
	}, [chatHistory, isScrollAtBottom]);

	useLayoutEffect(() => {
		if (isInitialScrollComplete || !chatHistory || chatHistory.chatChannelMessages.length === 0) {
			return;
		}

		messageEndRef.current?.scrollIntoView();
		setIsInitialScrollComplete(true);
	}, [chatHistory, isInitialScrollComplete]);

	useEffect(() => {
		const scrollElement = chatRef.current;
		let ticking = false;

		const handleScroll = () => {
			if (!ticking && scrollElement) {
				requestAnimationFrame(() => {
					const isBottom =
						scrollElement.scrollHeight - scrollElement.scrollTop - scrollElement.clientHeight <=
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
	}, [chatRef]);

	const handleLatestMessageClick = () => {
		setIsLatestMessageVisible(false);
		messageEndRef.current?.scrollIntoView();
	};

	const handleCheckScroll = (parsedMessage: Message) => {
		if (userStatus) {
			const isAutoScroll =
				chatRef.current &&
				chatRef.current.scrollHeight - chatRef.current.clientHeight - chatRef.current.scrollTop <=
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
				chatChannelMessages: [parsedMessage, ...(prevChatHistory?.chatChannelMessages ?? [])],
			}));
		}
	};

	return {
		isInitialScrollComplete,
		isLatestMessageVisible,
		messageEndRef,
		handleLatestMessageClick,
		handleCheckScroll,
	};
};

export default useChatScroll;
