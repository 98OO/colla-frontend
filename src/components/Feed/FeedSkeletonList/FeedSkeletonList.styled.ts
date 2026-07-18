import styled from 'styled-components';
import { FEED_BODY_MIN_HEIGHT, FEED_CARD_WIDTH } from '@styles/layout';
import theme from '@styles/theme';

export const FeedSkeletonList = styled.div`
	display: flex;
	flex-direction: column;
`;

export const FeedSkeleton = styled.div`
	display: flex;
	flex-direction: column;
	width: ${FEED_CARD_WIDTH}px;
	padding: ${theme.units.spacing.space24} 0 ${theme.units.spacing.space8} 0;
	border-radius: ${theme.units.radius.radius12};
	box-shadow: ${theme.elevation.shadow.shadow4};
	margin-bottom: ${theme.units.spacing.space32};
`;

export const FeedSkeletonContent = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 ${theme.units.spacing.space24};
	gap: ${theme.units.spacing.space24};
`;

export const FeedSkeletonBody = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space12};
	padding: ${theme.units.spacing.space16} 0;
	min-height: ${FEED_BODY_MIN_HEIGHT}px;
`;

export const FeedSkeletonDivider = styled.div`
	display: flex;
	padding: ${theme.units.spacing.space16} ${theme.units.spacing.space24};
`;

export const FeedSkeletonFooter = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space12};
	margin: 0 ${theme.units.spacing.space24} ${theme.units.spacing.space6}
		${theme.units.spacing.space24};
`;
