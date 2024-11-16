import { styled } from 'styled-components';
import theme from '@styles/theme';

export const FileUploadBoxContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 120px;
	border: 1px solid ${theme.color.border.primary};
	color: ${theme.color.text.tertiary};
	cursor: pointer;
`;

export const FileItemContainer = styled.div`
	width: 100%;
	height: 100%;
	padding: ${theme.units.spacing.space8};
	overflow-y: auto;
`;

export const FileItemWrapper = styled.div`
	display: flex;
	align-items: center;
	height: ${theme.units.spacing.space36};
	gap: ${theme.units.spacing.space12};
`;
