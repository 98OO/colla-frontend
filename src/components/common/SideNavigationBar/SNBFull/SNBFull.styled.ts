import styled from 'styled-components';
import theme from '@styles/theme';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 240px;
	padding: ${theme.units.spacing.space24} ${theme.units.spacing.space16};
	gap: ${theme.units.spacing.space24};
	height: calc(100vh - 64px);
	border-right: 1px solid ${theme.color.border.tertiary};
`;

export const HeadingWrapper = styled.div`
	padding-top: ${theme.units.spacing.space8};
	padding-bottom: ${theme.units.spacing.space4};
	padding-left: ${theme.units.spacing.space12};
	padding-right: ${theme.units.spacing.space12};
`;

export const ButtonWrapper = styled.button`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	height: 40px;
	background: none;
	border: none;
	border-radius: ${theme.units.radius.radius4};
	padding: 0 ${theme.units.spacing.space12};

	&:hover {
		background: ${theme.color.bg.iSecondaryHover};
	}
`;
