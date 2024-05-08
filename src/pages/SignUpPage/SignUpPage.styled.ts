import styled from 'styled-components';
import theme from '@styles/theme';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 400px;
	align-items: center;
	padding: 0 ${theme.units.spacing.space4};

	svg {
		margin-bottom: ${theme.units.spacing.space40};
	}
`;

export const FormContainer = styled.form`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space28};
	width: 100%;
`;

export const authContainer = styled.div`
	display: flex;
	gap: ${theme.units.spacing.space8};
`;
