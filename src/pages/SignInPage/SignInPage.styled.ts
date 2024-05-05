import { styled } from 'styled-components';
import theme from '@styles/theme';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 400px;
	align-items: center;
	padding: 0 ${theme.units.spacing.space4};
	gap: ${theme.units.spacing.space12};

	@media (min-width: 1441px) {
		gap: ${theme.units.spacing.space20};
	}
`;

export const ImageWrapper = styled.div`
	padding: ${theme.units.spacing.space20} 0;
`;

export const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: ${theme.units.spacing.space20};
`;

export const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space12};
`;

export const ButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: ${theme.units.spacing.space4} 0;
`;

export const TextWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const DividerContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	gap: ${theme.units.spacing.space6};
`;

export const Divider = styled.div`
	height: 1px;
	border-bottom: 1px solid ${theme.color.border.tertiary};
	flex: 1;
`;

export const OauthWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space12};
`;
