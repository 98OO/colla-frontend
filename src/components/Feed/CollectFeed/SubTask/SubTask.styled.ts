import { styled } from 'styled-components';
import theme from '@styles/theme';

export const SubTaskContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	padding: ${theme.units.spacing.space6} ${theme.units.spacing.space12};
	border: 1px solid ${theme.color.border.tertiary};
	border-radius: ${theme.units.radius.radius4};

	&:hover {
		background-color: ${theme.color.bg.iSecondaryHover};
		cursor: pointer;
	}
`;
