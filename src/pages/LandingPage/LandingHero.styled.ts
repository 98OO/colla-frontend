import styled, { css, keyframes } from 'styled-components';
import theme from '@styles/theme';

const reveal = keyframes`
	from { opacity: 0; transform: translateY(20px); filter: blur(4px); }
	to { opacity: 1; transform: translateY(0); filter: blur(0); }
`;

const heroReveal = (delay: number) => css`
	animation: ${reveal} 720ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms both;
	@media (prefers-reduced-motion: reduce) {
		animation: none;
	}
`;

export const HeroSection = styled.section`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: calc(100dvh - 72px);
	padding: clamp(64px, 7vw, 96px) ${theme.units.spacing.space24};
	overflow: hidden;
	background-color: ${theme.color.bg.primary};
	scroll-margin-top: 88px;

	@media (max-width: 640px) {
		align-items: flex-start;
		min-height: auto;
		padding: ${theme.units.spacing.space48} ${theme.units.spacing.space20}
			${theme.units.spacing.space64};
	}
`;

export const HeroInner = styled.div`
	width: min(100%, 1240px);
`;

export const HeroCopy = styled.div`
	display: grid;
	grid-template-columns: minmax(420px, 0.95fr) minmax(460px, 1.05fr);
	grid-template-areas: 'mascot message';
	column-gap: clamp(56px, 7vw, 104px);
	align-items: center;
	width: 100%;

	@media (max-width: 960px) {
		grid-template-columns: minmax(240px, 0.82fr) minmax(360px, 1.18fr);
		column-gap: ${theme.units.spacing.space40};
	}

	@media (max-width: 760px) {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
`;

export const HeroMessage = styled.div`
	display: flex;
	grid-area: message;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
`;

export const HeroTitle = styled.h1`
	max-width: 650px;
	color: ${theme.color.text.primary};
	font-size: clamp(50px, 5vw, 72px);
	font-weight: ${theme.typography.fontWeight.bold};
	line-height: 1.04;
	letter-spacing: -0.04em;
	text-wrap: balance;

	span {
		display: block;
	}

	@media (max-width: 960px) {
		font-size: clamp(40px, 5.2vw, 52px);
	}

	@media (max-width: 640px) {
		font-size: clamp(31px, 9.2vw, 38px);
		line-height: 1.08;
		letter-spacing: -0.035em;
		text-wrap: balance;

		span {
			white-space: normal;
		}
	}
`;

export const HeroDescription = styled.p`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space4};
	max-width: 44ch;
	margin-top: ${theme.units.spacing.space24};
	color: ${theme.color.text.secondary};
	font-size: 18px;
	font-weight: ${theme.typography.fontWeight.regular};
	line-height: 1.72;
	text-wrap: pretty;
	word-break: keep-all;
	${heroReveal(120)}

	span {
		white-space: nowrap;
	}

	@media (max-width: 960px) {
		max-width: 40ch;
		font-size: 16px;

		span {
			white-space: normal;
		}
	}

	@media (max-width: 640px) {
		margin-top: ${theme.units.spacing.space20};
		font-size: ${theme.typography.fontSize.body.lg};
		line-height: 1.65;

		span {
			white-space: normal;
		}
	}
`;

export const HeroActions = styled.div`
	display: flex;
	align-items: center;
	gap: ${theme.units.spacing.space20};
	margin-top: ${theme.units.spacing.space40};

	button {
		min-width: 164px;
		transition: filter 160ms ease;
	}

	button:hover {
		background-color: ${theme.color.bg.iPrimary};
		filter: brightness(1.08);
	}

	button:focus-visible,
	a:focus-visible {
		outline: 2px solid ${theme.color.border.focusRing};
		outline-offset: 3px;
	}

	${heroReveal(200)}

	@media (prefers-reduced-motion: reduce) {
		button {
			transition: none;
		}
	}

	@media (max-width: 480px) {
		flex-direction: column;
		gap: ${theme.units.spacing.space12};
		width: 100%;
		margin-top: ${theme.units.spacing.space32};

		button,
		a {
			width: 100%;
			min-width: 0;
		}
	}
`;

export const SecondaryAction = styled.a`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: ${theme.units.spacing.space4};
	height: 48px;
	padding: ${theme.units.spacing.space8};
	border: 0;
	border-radius: ${theme.units.radius.radius6};
	background-color: transparent;
	color: ${theme.color.text.secondary};
	font-size: ${theme.typography.fontSize.body.lg};
	font-weight: ${theme.typography.fontWeight.semiBold};
	text-decoration: none;
	transition: color 160ms ease;

	svg {
		width: 20px;
		height: 20px;
		transition: transform 160ms ease;
	}

	path {
		stroke: currentColor;
	}

	&:hover {
		color: ${theme.color.text.primary};

		svg {
			transform: translateX(2px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		transition: none;

		svg {
			transition: none;
		}
	}
`;

export const MascotFigure = styled.figure`
	position: relative;
	left: ${theme.units.spacing.space24};
	grid-area: mascot;
	justify-self: center;
	width: min(100%, 500px);
	isolation: isolate;

	&::before {
		position: absolute;
		z-index: -1;
		inset: 7% 2% 3% 1%;
		border-radius: ${theme.units.radius.radius16};
		background: linear-gradient(
			145deg,
			${theme.color.bg.iPrimary} 0%,
			${theme.color.bg.secondary} 100%
		);
		content: '';
		transform: rotate(-2deg);
	}

	&::after {
		position: absolute;
		z-index: -2;
		inset: 4% -1% 8% 6%;
		border-radius: ${theme.units.radius.radius16};
		background-color: ${theme.color.bg.iSelected};
		content: '';
		transform: rotate(4deg);
	}

	img {
		display: block;
		width: 100%;
		height: auto;
		filter: drop-shadow(0 24px 26px rgba(31, 41, 55, 0.13));
	}

	${heroReveal(260)}

	@media (max-width: 960px) {
		left: 0;
		width: min(100%, 400px);
	}

	@media (max-width: 760px) {
		display: none;
	}
`;

export const MascotBackdrop = styled.span`
	position: absolute;
	z-index: -3;
	inset: 3% -2% 10% 10%;
	border-radius: ${theme.units.radius.radius16};
	background-color: ${theme.color.bg.tertiary};
	transform: rotate(12deg);
`;
