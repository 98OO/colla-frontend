import styled, { keyframes } from 'styled-components';
import theme from '@styles/theme';

interface SkeletonBoxProps {
	$width?: number | string;
	$height?: number | string;
	$radius?: number | string;
}

const shimmer = keyframes`
	0% {
		background-position: 200% 0;
	}
	100% {
		background-position: -200% 0;
	}
`;

const toCssSize = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);

export const SkeletonBox = styled.div<SkeletonBoxProps>`
	width: ${(props) => toCssSize(props.$width ?? '100%')};
	height: ${(props) => toCssSize(props.$height ?? theme.units.spacing.space16)};
	border-radius: ${(props) => toCssSize(props.$radius ?? theme.units.radius.radius4)};
	background: linear-gradient(
		90deg,
		${theme.color.bg.secondary} 25%,
		${theme.color.border.tertiary} 50%,
		${theme.color.bg.secondary} 75%
	);
	background-size: 200% 100%;
	animation: ${shimmer} 1.5s ease-in-out infinite;
`;
