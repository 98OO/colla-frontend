import { styled } from 'styled-components';
import theme from '@styles/theme';

export const DocumentContainer = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid black;
	width: 100%;
	height: 100%;
	padding: ${theme.units.spacing.space32};
	gap: ${theme.units.spacing.space24};
`;

export const DocumentListContainer = styled.div`
	display: flex;
	padding: ${theme.units.spacing.space16};
	background-color: ${theme.color.bg.secondary};
`;

export const DocumentWrapper = styled.div`
	display: flex;
	width: 400px;
	justify-content: center;
`;
