import { styled } from 'styled-components';
import theme from '@styles/theme';

export const Container = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 100%;
`;

export const MyPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 920px;

	gap: ${theme.units.spacing.space10};
	padding: ${theme.units.spacing.space20} ${theme.units.spacing.space10};

	@media (max-width: 1440px) {
		width: 680px;
	}
`;

export const ImgUploadWrapper = styled.input`
	display: none;
`;
