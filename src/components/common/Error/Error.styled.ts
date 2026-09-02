import { styled } from 'styled-components';

export const ImageWrapper = styled.div`
	width: 340px;
	height: 340px;

	picture,
	img {
		display: block;
		width: 100%;
		height: 100%;
	}

	img {
		object-fit: cover;
	}
`;
