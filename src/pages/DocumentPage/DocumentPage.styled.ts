import { styled } from 'styled-components';
import theme from '@styles/theme';

export const DocumentContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 920px;
	height: 100%;
	overflow-x: none;
	gap: ${theme.units.spacing.space16};
`;

export const DocumentHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 24px 12px 16px 12px;
`;

export const DocumentHeaderActions = styled.div`
	display: flex;
	align-items: center;
	gap: ${theme.units.spacing.space12};
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

export const DocumentTitleName = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	gap: ${theme.units.spacing.space16};
	padding: 0 ${theme.units.spacing.space6};
`;

export const DocumentCheckbox = styled.input.attrs({ type: 'checkbox' })`
	width: 20px;
	height: 20px;
	cursor: pointer;
	appearance: none;
	border: 1.5px solid ${theme.color.border.iSecondary};
	border-radius: ${theme.units.radius.radius2};

	&:disabled {
		cursor: default;
		border-color: ${theme.color.border.disabled};
		background-color: ${theme.color.bg.disabled};
	}

	&:checked {
		background-color: ${theme.color.bg.iPrimary};
		border-color: ${theme.color.border.iPrimary};
	}

	&:checked::after {
		content: '✓';
		font-size: ${theme.typography.fontSize.body.lg};
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

export const DocumentStateContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
	gap: ${theme.units.spacing.space16};
`;

export const NumberButtonWrapper = styled.div.withConfig({
	shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>`
	button {
		color: ${({ active }) =>
			active ? `${theme.color.text.iPrimary}` : `${theme.color.text.tertiary}`};

		&:hover {
			color: ${theme.color.text.iPrimary};
		}
	}
`;
