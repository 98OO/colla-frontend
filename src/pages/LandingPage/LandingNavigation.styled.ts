import styled, { keyframes } from 'styled-components';
import theme from '@styles/theme';

const MOBILE_BREAKPOINT = '860px';

const revealMenu = keyframes`
	from {
		opacity: 0;
		clip-path: inset(0 0 18% 0);
		transform: translateY(-8px);
	}

	to {
		opacity: 1;
		clip-path: inset(0 0 0 0);
		transform: translateY(0);
	}
`;

const interactiveFocus = `
	&:focus-visible {
		outline: 2px solid ${theme.color.border.focusRing};
		outline-offset: 3px;
	}
`;

export const Header = styled.header<{ $isTransparent: boolean }>`
	position: sticky;
	top: 0;
	z-index: 20;
	width: 100%;
	background-color: ${({ $isTransparent }) =>
		$isTransparent ? 'rgba(255, 255, 255, 0.9)' : theme.color.bg.primary};
	border-bottom: 1px solid
		${({ $isTransparent }) => ($isTransparent ? 'transparent' : theme.color.border.tertiary)};
	-webkit-backdrop-filter: ${({ $isTransparent }) => ($isTransparent ? 'blur(24px)' : 'none')};
	backdrop-filter: ${({ $isTransparent }) => ($isTransparent ? 'blur(24px)' : 'none')};
	transition:
		background-color 180ms ease,
		border-color 180ms ease;

	svg path,
	button {
		transition:
			fill 180ms ease,
			color 180ms ease;
	}

	@media (prefers-reduced-motion: reduce) {
		transition: none;

		svg path,
		button {
			transition: none;
		}
	}
`;

export const Navigation = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: min(100%, 1248px);
	height: 72px;
	margin: 0 auto;
	padding: 0 ${theme.units.spacing.space32};

	@media (max-width: ${MOBILE_BREAKPOINT}) {
		padding: 0 ${theme.units.spacing.space20};
	}
`;

export const BrandLink = styled.a`
	display: inline-flex;
	align-items: center;
	flex: 0 0 auto;
	border-radius: ${theme.units.radius.radius4};

	svg {
		display: block;
		width: 82px;
		height: auto;
	}

	${interactiveFocus}
`;

export const DesktopActions = styled.div`
	display: flex;
	align-items: center;
	gap: ${theme.units.spacing.space8};

	button {
		white-space: nowrap;
		transition:
			background-color 160ms ease,
			border-color 160ms ease,
			color 160ms ease;
	}

	button:focus-visible {
		outline: 2px solid ${theme.color.border.focusRing};
		outline-offset: 3px;
	}

	@media (max-width: ${MOBILE_BREAKPOINT}) {
		display: none;
	}

	@media (prefers-reduced-motion: reduce) {
		button {
			transition: none;
		}
	}
`;

export const MobileMenuArea = styled.div<{ $isOpen: boolean }>`
	position: relative;
	display: none;

	&::after {
		content: '';
		position: absolute;
		top: 100%;
		right: 0;
		display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
		width: 40px;
		height: ${theme.units.spacing.space12};
	}

	@media (max-width: ${MOBILE_BREAKPOINT}) {
		display: block;
	}
`;

export const MenuButton = styled.button`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 44px;
	height: 44px;
	padding: 0;
	border: 0;
	border-radius: ${theme.units.radius.radius12};
	background-color: transparent;
	color: ${theme.color.text.primary};
	cursor: pointer;

	&:hover {
		background-color: ${theme.color.bg.tertiary};
	}

	${interactiveFocus}
`;

export const MenuIcon = styled.svg`
	width: 22px;
	height: 22px;

	path {
		fill: none;
		stroke: currentColor;
		stroke-width: 1.75;
		stroke-linecap: round;
	}
`;

export const MobileMenu = styled.div`
	position: fixed;
	top: 72px;
	left: 0;
	display: block;
	width: 100%;
	padding: ${theme.units.spacing.space20} ${theme.units.spacing.space20}
		${theme.units.spacing.space24};
	border-bottom: 1px solid ${theme.color.border.tertiary};
	background-color: ${theme.color.bg.primary};
	box-shadow: 0 24px 48px -32px rgba(31, 41, 55, 0.42);
	animation: ${revealMenu} 240ms cubic-bezier(0.16, 1, 0.3, 1) both;

	@media (prefers-reduced-motion: reduce) {
		animation: none;
	}
`;

export const MobileActions = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: ${theme.units.spacing.space8};

	button:focus-visible {
		outline: 2px solid ${theme.color.border.focusRing};
		outline-offset: 3px;
	}

	@media (max-width: 400px) {
		grid-template-columns: 1fr;
	}
`;
