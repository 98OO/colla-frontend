import styled from 'styled-components';
import { SCHEDULING_TIME_COLUMN_WIDTH } from '@constants/feed';
import { FEED_CARD_WIDTH } from '@styles/layout';
import theme from '@styles/theme';
import schedulingFeedPreviewBlocksUrl from './scheduling-feed-preview-blocks.svg';

const PREVIEW_HEADER_HEIGHT = 112;
const PREVIEW_HEADER_TEXT_OFFSET = { top: 6, left: 52 } as const;
const PREVIEW_HEADER_LINE_WIDTH = { primary: 112, secondary: 184 } as const;
const PREVIEW_FOOTER_HEIGHT = 64;
const PREVIEW_DAY_COUNT = 7;
const PREVIEW_BLOCKS_BACKGROUND = `url("${schedulingFeedPreviewBlocksUrl}")`;

export const Preview = styled.div<{ $height: number }>`
	display: flex;
	box-sizing: border-box;
	flex-direction: column;
	width: ${FEED_CARD_WIDTH}px;
	height: ${({ $height }) => `calc(${$height}px - ${theme.units.spacing.space32})`};
	padding: ${theme.units.spacing.space24};
	border-radius: ${theme.units.radius.radius12};
	background-color: ${theme.color.bg.primary};
	box-shadow: ${theme.elevation.shadow.shadow4};
	overflow: hidden;
	pointer-events: none;
`;

export const Header = styled.div`
	position: relative;
	flex: 0 0 ${PREVIEW_HEADER_HEIGHT}px;

	&::before {
		position: absolute;
		top: 0;
		left: 0;
		width: ${theme.units.spacing.space40};
		height: ${theme.units.spacing.space40};
		border-radius: ${theme.units.radius.full};
		background-color: ${theme.color.bg.secondary};
		content: '';
	}

	&::after {
		position: absolute;
		top: ${PREVIEW_HEADER_TEXT_OFFSET.top}px;
		left: ${PREVIEW_HEADER_TEXT_OFFSET.left}px;
		width: ${PREVIEW_HEADER_LINE_WIDTH.secondary}px;
		height: 52px;
		background:
			linear-gradient(${theme.color.bg.secondary} 0 0) 0 0 / ${PREVIEW_HEADER_LINE_WIDTH.primary}px
				${theme.units.spacing.space12} no-repeat,
			linear-gradient(${theme.color.bg.secondary} 0 0) 0 ${theme.units.spacing.space28} /
				${PREVIEW_HEADER_LINE_WIDTH.secondary}px ${theme.units.spacing.space16} no-repeat;
		content: '';
	}
`;

export const ScheduleGrid = styled.div`
	position: relative;
	min-height: 0;
	flex: 1 1 auto;
	margin-left: ${SCHEDULING_TIME_COLUMN_WIDTH}px;
	border-top: 1px solid ${theme.color.border.tertiary};
	border-left: 1px solid ${theme.color.border.tertiary};
	background-color: ${theme.color.bg.primary};
	background-image: ${PREVIEW_BLOCKS_BACKGROUND},
		url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='89' height='40' viewBox='0 0 89 40'%3E%3Cpath d='M88.5 0V40M0 20.5H89M0 39.5H89' fill='none' stroke='%23e5e7eb' stroke-width='1'/%3E%3C/svg%3E");
	background-repeat: no-repeat, round;
	background-size:
		100% 100%,
		calc(100% / ${PREVIEW_DAY_COUNT}) 40px;
`;

export const Footer = styled.div`
	position: relative;
	flex: 0 0 ${PREVIEW_FOOTER_HEIGHT}px;
	margin-top: ${theme.units.spacing.space24};

	&::before {
		position: absolute;
		top: ${theme.units.spacing.space4};
		left: 0;
		width: 88px;
		height: ${theme.units.spacing.space12};
		border-radius: ${theme.units.radius.radius6};
		background-color: ${theme.color.bg.secondary};
		box-shadow:
			0 26px 0 ${theme.color.bg.secondary},
			104px 26px 0 ${theme.color.bg.secondary};
		content: '';
	}

	&::after {
		position: absolute;
		top: ${theme.units.spacing.space12};
		right: 0;
		width: 88px;
		height: 36px;
		border-radius: ${theme.units.radius.radius8};
		background-color: ${theme.color.bg.secondary};
		content: '';
	}
`;
