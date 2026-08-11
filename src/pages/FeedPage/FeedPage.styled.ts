import styled from 'styled-components';
import {
	FEED_CARD_WIDTH,
	FEED_DETAIL_MAX_OFFSET,
	FEED_DETAIL_OFFSET_START_WIDTH,
} from '@styles/layout';
import { DRAWER_TRANSITION_DURATION_MS } from '@styles/motion';
import theme from '@styles/theme';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${theme.units.spacing.space20};
	width: 100%;
	height: 100%;
	container-type: inline-size;
	--feed-detail-offset: clamp(
		-${FEED_DETAIL_MAX_OFFSET}px,
		calc((${FEED_DETAIL_OFFSET_START_WIDTH}px - 100cqw) / 2),
		0px
	);
`;

export const FeedHeaderContainer = styled.div<{ $isOpen: boolean }>`
	position: fixed;
	z-index: 1;
	display: flex;
	flex-direction: column;
	background-color: ${theme.color.bg.primary};

	transition: transform ${DRAWER_TRANSITION_DURATION_MS}ms ease-in-out;
	transform: translateX(${({ $isOpen }) => ($isOpen ? 'var(--feed-detail-offset)' : '0')});

	@media (prefers-reduced-motion: reduce) {
		transition: none;
	}
`;

export const FeedHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: ${FEED_CARD_WIDTH}px;
	padding: 24px 12px 16px 12px;
`;

export const FeedsWrapper = styled.div<{ $isOpen: boolean }>`
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

export const SelectWrapper = styled.div`
	width: 120px;
	border: none;
`;
