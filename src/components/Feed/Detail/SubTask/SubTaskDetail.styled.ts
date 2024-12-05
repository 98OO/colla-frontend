import { styled } from 'styled-components';
import { editorStyles } from '@styles/editorStyles';
import theme from '@styles/theme';

export const SubTaskPostContainer = styled.form`
	display: flex;
	flex-direction: column;
	width: 680px;
	gap: ${theme.units.spacing.space32};
`;

export const PostInput = styled.input`
	font-size: ${theme.typography.fontSize.header.sm};
	font-weight: ${theme.typography.fontWeight.semiBold};
	border: none;
	outline: none;
`;

export const DetailWrapper = styled.div`
	${editorStyles}
	margin-bottom: ${theme.units.spacing.space48};
	width: 732px;
	min-height: 150px;
`;
