import styled from 'styled-components';
import theme from '@styles/theme';

export const ProfileContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: space-between;

	border-radius: ${theme.units.spacing.space6};
	&:hover {
		background-color: ${theme.color.bg.tertiary};
	}
`;

export const ProfileAvatarContainer = styled.div`
	flex-shrink: 0;
`;
