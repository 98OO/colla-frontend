import { styled } from 'styled-components';
import { editorStyles } from '@styles/editorStyles';
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
	${editorStyles}
	padding: ${theme.units.spacing.space16} 0;
`;

export const CommentPreviewWrapper = styled.div`
	display: flex;
	margin-top: ${theme.units.spacing.space12};
	margin-left: ${theme.units.spacing.space24};
	margin-bottom: ${theme.units.spacing.space6};
	gap: ${theme.units.spacing.space8};
`;

export const Participants = styled.div`
	font-size: ${theme.typography.fontSize.header.xxs};
	font-weight: ${theme.typography.fontWeight.semiBold};
`;

export const TableContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	margin-bottom: ${theme.units.spacing.space8};
`;

export const TimeColumn = styled.div`
	display: flex;
	flex-direction: column;
	width: 40px;
`;

export const TimeSlot = styled.div`
	width: 40px;
	height: 40px;
	font-weight: ${theme.typography.fontWeight.regular};
	font-size: ${theme.typography.fontSize.body.sm};
	color: ${theme.color.text.secondary};
`;

export const Column = styled.div`
	display: flex;
	flex-direction: column;
`;

export const SlotGroup = styled.div`
	border: 1px solid ${theme.color.border.tertiary};
	box-sizing: border-box;
`;

export const Slot = styled.div`
	width: 90px;
	height: 20px;
	background-color: ${theme.color.bg.primary};
`;
