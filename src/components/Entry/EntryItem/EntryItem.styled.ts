import { styled } from 'styled-components';
import theme from '@styles/theme';

export const FormContainer = styled.form`
	display: flex;
	flex-direction: column;
	width: 50%;
	border: 1px solid ${theme.color.border.primary};
	padding: ${theme.units.spacing.space16} ${theme.units.spacing.space12};
	border-radius: ${theme.units.radius.radius6};
	gap: ${theme.units.spacing.space12};
`;

export const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${theme.units.spacing.space6};

	div {
		width: 100%;
	}
`;

export const ImageWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 216px;

	img {
		width: 274px;
	}
`;
