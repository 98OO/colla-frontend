import styled from 'styled-components';
import theme from '@styles/theme';

export const FeedAuthorContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: space-between;

	border-radius: ${theme.units.spacing.space6};
`;

export const FeedAuthorAvatarContainer = styled.div`
	flex-shrink: 0;
`;
