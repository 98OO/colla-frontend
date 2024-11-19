import styled from 'styled-components';
import theme from '@styles/theme';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${theme.units.spacing.space20};
	width: 100%;
	height: 100%;
`;

export const FeedHeaderContainer = styled.div<{
	isOpen: boolean;
	adjustedWidth: number;
}>`
	position: fixed;
	z-index: 1;
	display: flex;
	flex-direction: column;
	background-color: ${theme.color.bg.primary};

	transition: transform 0.3s ease-in-out;
	transform: ${({ isOpen, adjustedWidth }) =>
		isOpen ? `translateX(-${adjustedWidth}px)` : 'translateX(0)'};
`;

export const FeedHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 680px;
	padding: 24px 12px 16px 12px;
`;

export const FeedsWrapper = styled.div<{
	isOpen: boolean;
	adjustedWidth: number;
}>`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
	margin-top: 82px;
	padding-top: 10px;
	overflow-x: hidden;
	overflow: auto;

	transition: transform 0.3s ease-in-out;
	transform: ${({ isOpen, adjustedWidth }) =>
		isOpen ? `translateX(-${adjustedWidth}px)` : 'translateX(0)'};

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
