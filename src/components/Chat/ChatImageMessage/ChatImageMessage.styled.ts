import styled from 'styled-components';
import type { Orientation } from '@type/chat';

const IMAGE_CARD_SIZE: Record<Orientation, { width: string; height: string }> = {
	landscape: {
		width: '260px',
		height: '174px',
	},
	portrait: {
		width: '260px',
		height: '325px',
	},
	square: {
		width: '260px',
		height: '260px',
	},
};

export const ImageLink = styled.a<{
	$orientation: Orientation;
}>`
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	overflow: hidden;

	width: ${(props) => IMAGE_CARD_SIZE[props.$orientation].width};
	height: ${(props) => IMAGE_CARD_SIZE[props.$orientation].height};
`;

export const PreviewImage = styled.img<{ $isLoaded: boolean }>`
	display: block;
	width: auto;
	height: auto;
	max-width: 100%;
	max-height: 100%;
	object-fit: contain;
	opacity: ${(props) => (props.$isLoaded ? 1 : 0)};
`;
