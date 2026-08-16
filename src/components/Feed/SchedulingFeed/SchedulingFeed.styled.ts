import { styled, css } from 'styled-components';
import { SCHEDULING_SLOT_HEIGHT } from '@constants/feed';
import theme from '@styles/theme';

export const FeedContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 680px;
	padding: ${theme.units.spacing.space24} 0 ${theme.units.spacing.space8} 0;
	border-radius: ${theme.units.radius.radius12};
	box-shadow: ${theme.elevation.shadow.shadow4};
	margin-bottom: ${theme.units.spacing.space32};
`;

export const DetailWrapper = styled.div`
	padding: ${theme.units.spacing.space16} 0;
`;

export const ParticipantsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space16};
	font-size: ${theme.typography.fontSize.header.xxs};
	font-weight: ${theme.typography.fontWeight.semiBold};
`;

export const Caption = styled.div`
	font-size: ${theme.typography.fontSize.header.xxs};
	font-weight: ${theme.typography.fontWeight.medium};
`;

export const ParticipantWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	min-height: 24px;
	gap: ${theme.units.spacing.space8} ${theme.units.spacing.space16};
`;

export const ParticipantChip = styled.div`
	display: flex;
	align-items: center;
	gap: ${theme.units.spacing.space6};
	font-size: ${theme.typography.fontSize.body.md};
	font-weight: ${theme.typography.fontWeight.regular};
`;

export const GridContainer = styled.div`
	display: flex;
	flex-grow: 1;
	margin-bottom: ${theme.units.spacing.space32};
	user-select: none;
`;

export const TimeColumn = styled.div`
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	width: 50px;
	padding-right: ${theme.units.spacing.space10};
	border-right: 1px solid ${theme.color.border.tertiary};
	font-size: ${theme.typography.fontSize.body.sm};
	color: ${theme.color.text.secondary};
	box-sizing: border-box;
`;

export const TimeLabel = styled.div`
	height: ${SCHEDULING_SLOT_HEIGHT}px;
	padding-right: ${theme.units.spacing.space4};
	text-align: right;
	box-sizing: border-box;
`;

export const Grid = styled.div<{ $dayCount: number }>`
	--slot-height: ${SCHEDULING_SLOT_HEIGHT}px;
	--grid-background-color: ${theme.color.bg.primary};
	--grid-border-color: ${theme.color.border.tertiary};

	display: grid;
	grid-template-columns: repeat(${({ $dayCount }) => $dayCount}, minmax(0, 1fr));
	flex-grow: 1;
	font-size: ${theme.typography.fontSize.body.md};
	box-sizing: border-box;
	border-top: 1px solid ${theme.color.border.tertiary};
	border-right: 0.7px solid ${theme.color.border.tertiary};
	border-bottom: 0.7px solid ${theme.color.border.tertiary};
`;

export const Column = styled.div`
	display: flex;
	flex-direction: column;
	border-right: 0.7px solid ${theme.color.border.tertiary};
	background-color: ${theme.color.bg.primary};
	box-sizing: border-box;
`;

const slotBase = css`
	height: ${SCHEDULING_SLOT_HEIGHT}px;
	box-sizing: border-box;

	border-top: 1px dashed ${theme.color.border.tertiary};

	&[data-hour-start] {
		border-top: 0.5px solid ${theme.color.border.tertiary};
	}

	&:first-child {
		border-top: none;
	}
`;

export const Slot = styled.div`
	${slotBase}
	cursor: pointer;
	touch-action: none;
	position: relative;

	&::after {
		content: '';
		position: absolute;
		inset: 0;
		opacity: 0;
		will-change: opacity;
		transition: opacity 0.15s cubic-bezier(0.2, 0, 0, 1);
		pointer-events: none;
		background-color: ${theme.color.bg.iSelected};
	}

	&.selected::after {
		opacity: 1;
	}

	&.isPast {
		pointer-events: none;
		background-color: ${theme.color.bg.disabled};
	}
`;

export const HeaderContainer = styled.div`
	display: flex;
	flex-grow: 1;
	box-sizing: border-box;
	user-select: none;
`;

export const TimeHeader = styled.div`
	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;
	height: 42px;
	width: 50px;
	padding-right: ${theme.units.spacing.space4};
`;

export const HeaderWrapper = styled.div<{ $dayCount: number }>`
	display: grid;
	grid-template-columns: repeat(${({ $dayCount }) => $dayCount}, minmax(0, 1fr));
	flex-grow: 1;
	box-sizing: border-box;
	padding-bottom: ${theme.units.spacing.space4};
`;

export const Header = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 42px;
	gap: ${theme.units.spacing.space8};
`;

export const Day = styled.div`
	font-size: ${theme.typography.fontSize.body.md};
`;

export const Date = styled.div`
	font-size: ${theme.typography.fontSize.body.sm};
	color: ${theme.color.text.secondary};
`;
