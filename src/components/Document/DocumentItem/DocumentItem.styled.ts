import { styled } from 'styled-components';
import theme from '@styles/theme';

export const DocumentItemContainer = styled.div`
	display: flex;
	height: 55px;
`;

export const DocumentNameContainer = styled.div`
	display: flex;
	align-items: center;
	width: 45%;
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

export const DocumentNameWrapper = styled.div`
	width: 75%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

export const DocumentItemWrapper = styled.div<{ width: string }>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${(props) => props.width};
`;
