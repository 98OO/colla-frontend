import { styled } from 'styled-components';
import theme from '@styles/theme';

export const DocumentItemContainer = styled.div`
	display: flex;
	min-height: 36px;
`;

export const DocumentNameContainer = styled.div`
	display: flex;
	align-items: center;
	width: 45%;
	gap: ${theme.units.spacing.space12};
	padding: 0 ${theme.units.spacing.space6};
`;

export const DocumentCheckbox = styled.input.attrs({ type: 'checkbox' })`
	width: 18px;
	height: 18px;
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
		font-size: ${theme.typography.fontSize.body.md};
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

export const DocumentNameWrapper = styled.div`
	flex: 1;
	min-width: 0;
	overflow: hidden;

	& > p {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		line-height: 1.5;
	}
`;

export const DocumentItemWrapper = styled.div<{ width: string }>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${(props) => props.width};
`;
