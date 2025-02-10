import { useRef, useState, useEffect } from 'react';
import { CHAT_AUTO_SCROLL_LIMIT } from '@constants/size';
import type { ChatData } from '@type/chat';

const useChatScroll = (messageEndRef: React.RefObject<HTMLInputElement>) => {
	const [chatHistory, setChatHistory] = useState<ChatData | null>(null);
	const [isScrollAtBottom, setIsScrollAtBottom] = useState(false);
	const [initialLoad, setInitialLoad] = useState(true);
	const [isLatestMessageVisible, setIsLatestMessageVisible] = useState(false);
	const [prevHeight, setPrevHeight] = useState(0);
	const chatRef = useRef<HTMLDivElement>(null);

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

	return {
		chatRef,
		chatHistory,
		isLatestMessageVisible,
		setIsScrollAtBottom,
		setIsLatestMessageVisible,
		setChatHistory,
		setPrevHeight,
		handleLatestMessageClick,
	};
};

export default useChatScroll;
