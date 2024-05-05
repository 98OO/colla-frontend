import { styled } from 'styled-components';
import theme from '@styles/theme';

export const Container = styled.div`
	display: flex;
	align-items: center;
	gap: ${theme.units.spacing.space80};
`;

export const ImageWrapper = styled.div`
	width: 340px;
	height: 340px;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const CTAContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: ${theme.units.spacing.space12};

	width: 360px;

	svg {
		width: 240px;
		height: 100px;
		margin-bottom: ${theme.units.spacing.space40};
	}
`;

export const CTATextWrapper = styled.div`
	display: flex;
	align-items: center;
`;
