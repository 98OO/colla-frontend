import { styled } from 'styled-components';
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

export const TableContainer = styled.div`
	display: flex;
	flex-grow: 1;
	margin-bottom: ${theme.units.spacing.space32};
`;

export const TimeColumn = styled.div`
	display: flex;
	flex-direction: column;
	padding-right: ${theme.units.spacing.space10};
	border-right: 1px solid ${theme.color.border.tertiary};
	font-size: ${theme.typography.fontSize.body.sm};
	box-sizing: border-box;
`;

export const TimeGroup = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 40px;
	box-sizing: border-box;
`;

export const TimeSlot = styled.div`
	height: 20px;
	padding-right: ${theme.units.spacing.space4};
	text-align: right;
	box-sizing: border-box;
`;

export const Table = styled.div`
	display: flex;
	flex-grow: 1;
	font-size: ${theme.typography.fontSize.body.md};
	box-sizing: border-box;
	border-top: 1px solid ${theme.color.border.tertiary};
`;

export const Column = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const Slots = styled.div`
	cursor: pointer;
`;

export const SlotGroup = styled.div`
	box-sizing: border-box;
	height: 40px;
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid ${theme.color.border.tertiary};
	border-right: 1px solid ${theme.color.border.tertiary};
	background-color: ${theme.color.bg.primary};
`;

export const Slot = styled.div`
	height: 20px;
	background-color: transparent;
`;
