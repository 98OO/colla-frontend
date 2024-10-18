import { styled } from 'styled-components';
import theme from '@styles/theme';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${theme.units.spacing.space32};
	width: 100%;
	height: 100%;
	padding-top: ${theme.units.spacing.space24};
`;
