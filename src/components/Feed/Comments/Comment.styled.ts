import { styled } from 'styled-components';
import theme from '@styles/theme';

export const CommentContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding: ${theme.units.spacing.space12} 0;
	border-radius: ${theme.units.radius.radius8};
	width: 100%;
	cursor: pointer;
`;

export const AvatarContainer = styled.div`
	flex-shrink: 0;
`;
