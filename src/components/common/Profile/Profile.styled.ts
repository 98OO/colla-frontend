import styled from 'styled-components';
import theme from '@styles/theme';

export const ProfileContainer = styled.div`
	display: flex;
	align-items: center;
	border-radius: ${theme.units.spacing.space6};
	gap: ${theme.units.spacing.space8};

	&:hover {
		background-color: ${theme.color.bg.tertiary};
	}
`;
