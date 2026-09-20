import { styled } from 'styled-components';
import theme from '@styles/theme';

export const Container = styled.div`
	position: fixed;
	inset: 0;
	width: 100%;
	height: 100dvh;
	overflow-x: hidden;
	overflow-y: auto;
	background-color: ${theme.color.bg.primary};
	color: ${theme.color.text.primary};
	font-family:
		'Pretendard Variable',
		Pretendard,
		system-ui,
		-apple-system,
		BlinkMacSystemFont,
		sans-serif;
	scroll-behavior: smooth;
	scroll-padding-top: 72px;
	scrollbar-color: ${theme.color.border.secondary} ${theme.color.bg.primary};

	button {
		font-family: inherit;
	}

	&::selection,
	*::selection {
		background-color: ${theme.color.bg.iSelected};
		color: ${theme.color.text.primary};
	}

	@media (prefers-reduced-motion: reduce) {
		scroll-behavior: auto;
	}
`;

export const DeferredContent = styled.div`
	min-height: 1px;
`;
