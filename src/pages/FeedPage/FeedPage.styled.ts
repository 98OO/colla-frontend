import { styled } from 'styled-components';
import theme from '@styles/theme';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${theme.units.spacing.space20};
	width: 100%;
	height: 100%;
`;

export const FeedHeaderContainer = styled.div`
	position: fixed;
	z-index: 1;
	display: flex;
	flex-direction: column;
	background-color: ${theme.color.bg.primary};
`;

export const FeedHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 680px;
	padding: 24px 12px 16px 12px;
`;

export const FeedsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
	margin-top: 86px;
	overflow-x: hidden;
	overflow: auto;

	&::-webkit-scrollbar {
		width: 4px;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: ${theme.units.radius.radius20};
		background: ${theme.color.border.secondary};
	}
`;

export const SelectWrapper = styled.div`
	width: 120px;
	border: none;
`;
