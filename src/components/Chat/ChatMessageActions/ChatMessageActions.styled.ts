import styled from 'styled-components';
import theme from '@styles/theme';

export const Container = styled.div`
	display: flex;
	align-items: center;

	padding: ${theme.units.spacing.space2};
	border-radius: ${theme.units.radius.radius6};
	background-color: ${theme.color.bg.iSecondary};
`;
