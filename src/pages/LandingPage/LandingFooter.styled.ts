import styled from 'styled-components';
import theme from '@styles/theme';

export const Footer = styled.footer`
	padding: ${theme.units.spacing.space48} ${theme.units.spacing.space32};
	border-top: 1px solid ${theme.color.border.tertiary};
	background-color: ${theme.color.bg.primary};

	@media (max-width: 640px) {
		padding: ${theme.units.spacing.space40} ${theme.units.spacing.space20};
	}
`;

export const FooterInner = styled.div`
	display: flex;
	width: min(100%, 1184px);
	margin: 0 auto;
	flex-direction: column;
	gap: ${theme.units.spacing.space40};
`;

export const FooterMain = styled.div`
	display: flex;
	align-items: flex-start;
`;

export const BrandGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space12};
`;

export const BrandLink = styled.a`
	display: inline-flex;
	width: fit-content;
	align-items: center;
	border-radius: ${theme.units.radius.radius4};

	svg {
		display: block;
		width: 82px;
		height: auto;
	}

	&:focus-visible {
		outline: 2px solid ${theme.color.border.focusRing};
		outline-offset: 3px;
	}
`;

export const Tagline = styled.p`
	color: ${theme.color.text.secondary};
	font-size: ${theme.typography.fontSize.body.md};
	line-height: 1.6;
`;

export const Copyright = styled.p`
	padding-top: ${theme.units.spacing.space24};
	border-top: 1px solid ${theme.color.border.tertiary};
	color: ${theme.color.text.tertiary};
	font-size: ${theme.typography.fontSize.body.sm};
	line-height: 1.5;
`;
