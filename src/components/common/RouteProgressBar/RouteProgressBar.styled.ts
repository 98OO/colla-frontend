import styled, { css, keyframes } from 'styled-components';
import theme from '@styles/theme';

const advance = keyframes`
	0% {
		transform: scaleX(0.08);
	}

	35% {
		transform: scaleX(0.55);
	}

	70% {
		transform: scaleX(0.75);
	}

	100% {
		transform: scaleX(0.9);
	}
`;

interface ProgressBarProps {
	$isComplete: boolean;
}

export const ProgressBar = styled.div<ProgressBarProps>`
	position: fixed;
	top: 0;
	left: 0;
	z-index: ${theme.elevation.zIndex.DIALOG};
	width: 100%;
	height: 3px;
	background-color: ${theme.color.bg.iPrimary};
	pointer-events: none;
	transform-origin: left;

	${({ $isComplete }) =>
		$isComplete
			? css`
					transform: scaleX(1);
					opacity: 0;
					transition:
						transform 120ms ease-out,
						opacity 120ms ease-in 120ms;
				`
			: css`
					animation: ${advance} 8s cubic-bezier(0.1, 0.7, 0.1, 1) forwards;
				`}

	@media (prefers-reduced-motion: reduce) {
		animation: none;
		transform: ${({ $isComplete }) => ($isComplete ? 'scaleX(1)' : 'scaleX(0.75)')};
		transition: ${({ $isComplete }) => ($isComplete ? 'opacity 120ms ease-in' : 'none')};
	}
`;
