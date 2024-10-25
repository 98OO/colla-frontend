import styled from 'styled-components';
import { SNB_ICON_WIDTH } from '@styles/layout';
import theme from '@styles/theme';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: ${SNB_ICON_WIDTH};
	height: calc(100vh - 64px);

	padding: ${theme.units.spacing.space24} ${theme.units.spacing.space16};
	gap: ${theme.units.spacing.space24};
	border-right: 1px solid ${theme.color.border.tertiary};
`;

export const ButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	button {
		padding: ${theme.units.spacing.space8};
		&:hover {
			cursor: pointer;
		}
	}
`;
