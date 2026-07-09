import { styled, css } from 'styled-components';
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

export const SchedulingContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 ${theme.units.spacing.space24};
	gap: ${theme.units.spacing.space24};
`;

export const DetailWrapper = styled.div`
	padding: ${theme.units.spacing.space16} 0;
`;

export const CommentPreviewWrapper = styled.div`
	display: flex;
	margin-top: ${theme.units.spacing.space12};
	margin-left: ${theme.units.spacing.space24};
	margin-bottom: ${theme.units.spacing.space6};
	gap: ${theme.units.spacing.space8};
`;

export const ParticipantsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space16};
	font-size: ${theme.typography.fontSize.header.xxs};
	font-weight: ${theme.typography.fontWeight.semiBold};
`;

export const Participants = styled.div`
	font-size: ${theme.typography.fontSize.header.xxs};
	font-weight: ${theme.typography.fontWeight.semiBold};
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
	padding-right: ${theme.units.spacing.space10};
	border-right: 1px solid ${theme.color.border.tertiary};
	font-size: ${theme.typography.fontSize.body.sm};
	color: ${theme.color.text.secondary};
	box-sizing: border-box;
`;

export const TimeLabel = styled.div`
	height: 40px;
	padding-right: ${theme.units.spacing.space4};
	text-align: right;
	box-sizing: border-box;
`;

export const Grid = styled.div`
	display: flex;
	flex-grow: 1;
	font-size: ${theme.typography.fontSize.body.md};
	box-sizing: border-box;
	border-top: 1px solid ${theme.color.border.tertiary};
	border-right: 0.7px solid ${theme.color.border.tertiary};
	border-bottom: 0.7px solid ${theme.color.border.tertiary};
`;

export const Column = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	border-right: 0.7px solid ${theme.color.border.tertiary};
	background-color: ${theme.color.bg.primary};
`;

const slotBase = css`
	height: 20px;
	box-sizing: border-box;

	&:nth-child(even) {
		border-bottom: 0.5px solid ${theme.color.border.tertiary};
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
`;

export const HeaderContainer = styled.div`
	display: flex;
	flex-grow: 1;
	box-sizing: border-box;
`;

export const TimeHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 42px;
	width: 50px;
	padding-right: ${theme.units.spacing.space4};
`;

export const HeaderWrapper = styled.div`
	display: flex;
	flex-grow: 1;
	box-sizing: border-box;
	padding-bottom: ${theme.units.spacing.space4};
`;

export const Header = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
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

export const AvailabilitySlot = styled.div<{ slotColor: string }>`
	${slotBase}
	background-color: ${({ slotColor }) => slotColor || 'transparent'};

	&:hover {
		border: 2px dotted ${theme.color.border.iSecondaryHover};
	}
`;
