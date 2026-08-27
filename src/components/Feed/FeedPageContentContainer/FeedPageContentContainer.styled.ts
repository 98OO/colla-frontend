import styled from 'styled-components';
import { DRAWER_TRANSITION_DURATION_MS } from '@styles/motion';
import theme from '@styles/theme';

export const FeedPageContentContainer = styled.div<{ $isOpen: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
	margin-top: 82px;
	padding-top: 10px;
	overflow-x: hidden;
	overflow-y: auto;

	transition: transform ${DRAWER_TRANSITION_DURATION_MS}ms ease-in-out;
	transform: translateX(${({ $isOpen }) => ($isOpen ? 'var(--feed-detail-offset)' : '0')});

	@media (prefers-reduced-motion: reduce) {
		transition: none;
	}

	&::-webkit-scrollbar {
		width: 4px;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: ${theme.units.radius.radius20};
		background: ${theme.color.border.secondary};
	}
`;
