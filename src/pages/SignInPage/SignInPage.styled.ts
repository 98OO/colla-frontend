import { styled } from 'styled-components';
import theme from '@styles/theme';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 400px;
	align-items: center;
	padding: 0 ${theme.units.spacing.space4};
	gap: ${theme.units.spacing.space16};

	@media (min-width: 1441px) {
		gap: ${theme.units.spacing.space20};
	}
`;

export const ImageWrapper = styled.div`
	padding-bottom: ${theme.units.spacing.space20};
`;

export const FormContainer = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
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

export const WarningTextWrapper = styled.div`
	display: flex;
	align-items: center;
	height: 36px;
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
	margin-bottom: ${theme.units.spacing.space4};
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

export const InvitedTeamspaceInfo = styled.div`
	display: flex;
	flex-direction: column;
	width: 400px;
	border-radius: ${theme.units.radius.radius8};
	border: 1px solid ${theme.color.border.tertiary};
	padding: ${theme.units.spacing.space16} ${theme.units.spacing.space24};
	margin-bottom: ${theme.units.spacing.space8};
	gap: ${theme.units.spacing.space12};
`;
