import { styled } from 'styled-components';
import theme from '@styles/theme';

export const FeedContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space20};
	width: 680px;
	min-height: 720px;
	padding: ${theme.units.spacing.space24};
	border-radius: ${theme.units.radius.radius12};
	box-shadow: ${theme.elevation.shadow.shadow8};
	margin-bottom: ${theme.units.spacing.space32};
`;

export const DetailWrapper = styled.div`
	min-height: 400px;
`;

export const CommentContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: ${theme.units.spacing.space12} ${theme.units.spacing.space8};
	gap: ${theme.units.spacing.space12};

	button {
		height: 20px;
		padding: 0px;
	}
`;
