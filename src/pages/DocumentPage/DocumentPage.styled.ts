import { styled } from 'styled-components';
import theme from '@styles/theme';

export const DocumentContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 920px;
	height: 100%;
	padding: ${theme.units.spacing.space20} ${theme.units.spacing.space10};
	overflow-x: none;
	gap: ${theme.units.spacing.space16};
`;

export const DocumentTitleContainer = styled.div`
	display: flex;
	background-color: ${theme.color.bg.secondary};
	height: 48px;
`;

export const DocumentTitleWrapper = styled.div<{ width: string }>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${(props) => props.width || 'auto'};
`;

export const NumberButtonWrapper = styled.div<{ active: boolean }>`
	button {
		color: ${({ active }) =>
			active ? `${theme.color.text.iPrimary}` : `${theme.color.text.tertiary}`};

		&:hover {
			color: ${theme.color.text.iPrimary};
		}
	}
`;
