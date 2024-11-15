import { styled } from 'styled-components';
import theme from '@styles/theme';

export const ChatAttachmentWrapper = styled.div`
	display: flex;
	border: 1px solid ${theme.color.border.primary};
	justify-content: space-between;
	padding: ${theme.units.spacing.space12};
	border-radius: ${theme.units.radius.radius8};
	gap: ${theme.units.spacing.space16};
	overflow-y: hidden;
	max-height: 160px;
`;

export const ChatAttachmentsInnerItem = styled.div`
	display: flex;
	align-items: center;
	flex-shrink: 0;
`;
