import styled from 'styled-components';
import {
	SCHEDULING_HEADER_HEIGHT,
	SCHEDULING_SLOT_HEIGHT,
	SCHEDULING_TIME_COLUMN_WIDTH,
} from '@constants/feed';
import { FEED_CARD_WIDTH } from '@styles/layout';
import theme from '@styles/theme';

const PREVIEW_AUTHOR_LINE_WIDTH = { primary: 132, secondary: 84 } as const;
const PREVIEW_TITLE_WIDTH_RATIO = 42;
const PREVIEW_DAY_COUNT = 7;
const PREVIEW_HEADER_LINE_WIDTH_RATIO = 62;
const PREVIEW_GRID_MIN_HEIGHT = 120;
const PREVIEW_SELECTION_AREA = { top: 20, left: 29, width: 28, height: 24 } as const;

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
	pointer-events: none;
`;

export const Author = styled.div`
	display: flex;
	align-items: center;
	gap: ${theme.units.spacing.space12};
`;

export const Avatar = styled.div`
	width: ${theme.units.spacing.space40};
	height: ${theme.units.spacing.space40};
	flex-shrink: 0;
	border-radius: ${theme.units.radius.full};
	background-color: ${theme.color.bg.secondary};
`;

export const AuthorLines = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space8};

	&::before,
	&::after {
		display: block;
		height: ${theme.units.spacing.space10};
		border-radius: ${theme.units.radius.radius6};
		background-color: ${theme.color.bg.secondary};
		content: '';
	}

	&::before {
		width: ${PREVIEW_AUTHOR_LINE_WIDTH.primary}px;
	}

	&::after {
		width: ${PREVIEW_AUTHOR_LINE_WIDTH.secondary}px;
	}
`;

export const Title = styled.div`
	width: ${PREVIEW_TITLE_WIDTH_RATIO}%;
	height: ${theme.units.spacing.space16};
	margin-top: ${theme.units.spacing.space28};
	border-radius: ${theme.units.radius.radius8};
	background-color: ${theme.color.bg.secondary};
`;

export const ScheduleHeader = styled.div`
	height: ${SCHEDULING_HEADER_HEIGHT}px;
	margin-top: ${theme.units.spacing.space32};
	margin-left: ${SCHEDULING_TIME_COLUMN_WIDTH}px;
	background-image: linear-gradient(
		to right,
		${theme.color.bg.secondary} 0,
		${theme.color.bg.secondary} ${PREVIEW_HEADER_LINE_WIDTH_RATIO}%,
		transparent ${PREVIEW_HEADER_LINE_WIDTH_RATIO}%,
		transparent 100%
	);
	background-repeat: repeat-x;
	background-size: calc(100% / ${PREVIEW_DAY_COUNT}) 100%;
`;

export const ScheduleGrid = styled.div`
	position: relative;
	min-height: ${PREVIEW_GRID_MIN_HEIGHT}px;
	flex: 1;
	margin-top: ${theme.units.spacing.space8};
	margin-left: ${SCHEDULING_TIME_COLUMN_WIDTH}px;
	border: 1px solid ${theme.color.border.tertiary};
	background-image: repeating-linear-gradient(
			to bottom,
			transparent 0,
			transparent ${SCHEDULING_SLOT_HEIGHT - 1}px,
			${theme.color.border.tertiary} ${SCHEDULING_SLOT_HEIGHT - 1}px,
			${theme.color.border.tertiary} ${SCHEDULING_SLOT_HEIGHT}px
		),
		repeating-linear-gradient(
			to right,
			transparent 0,
			transparent calc((100% / ${PREVIEW_DAY_COUNT}) - 1px),
			${theme.color.border.tertiary} calc((100% / ${PREVIEW_DAY_COUNT}) - 1px),
			${theme.color.border.tertiary} calc(100% / ${PREVIEW_DAY_COUNT})
		);

	&::after {
		position: absolute;
		top: ${PREVIEW_SELECTION_AREA.top}%;
		left: ${PREVIEW_SELECTION_AREA.left}%;
		width: ${PREVIEW_SELECTION_AREA.width}%;
		height: ${PREVIEW_SELECTION_AREA.height}%;
		border-radius: ${theme.units.radius.radius4};
		background-color: ${theme.color.bg.iSelected};
		content: '';
	}
`;
