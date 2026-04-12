import { styled } from 'styled-components';
import theme from '@styles/theme';

export const ProfileContainer = styled.div`
	display: flex;
	padding: ${theme.units.spacing.space12} 0;
	border-bottom: 0.6px solid ${theme.color.border.tertiary};
`;
