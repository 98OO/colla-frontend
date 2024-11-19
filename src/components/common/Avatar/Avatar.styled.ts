import styled from 'styled-components';
import theme from '@styles/theme';
import type { AvatarProps } from './Avatar';

const avatarSizeMap = {
	xl: '80px',
	lg: '48px',
	mlg: '40px',
	md: '32px',
	sm: '24px',
	xs: '16px',
} as const;

const AVATAR_COLORS = [
	'#4A90E2', // 밝은 파랑
	'#5C6BC0', // 인디고
	'#64B5F6', // 하늘색
	'#0288D1', // 깊은 파랑

	'#66BB6A', // 밝은 초록
	'#26A69A', // 청록색
	'#81C784', // 연한 초록
	'#2E7D32', // 깊은 초록

	'#FF7043', // 산호색
	'#FF8A65', // 연한 주황
	'#F57C00', // 진한 주황
	'#FFB74D', // 황금색

	'#7E57C2', // 보라
	'#BA68C8', // 밝은 보라
	'#EC407A', // 분홍
	'#D81B60', // 진한 분홍

	'#78909C', // 블루 그레이
	'#616161', // 다크 그레이
	'#795548', // 브라운
	'#607D8B', // 쿨 그레이
] as const;

const getColorFromSeed = (seed: string): string => {
	const { length } = seed;
	let hash = 0;

	for (let i = 0; i < length; i += 1) {
		// 비트 연산자 대신 곱셈과 나눗셈 사용
		hash = seed.charCodeAt(i) + ((hash * 31) % Number.MAX_SAFE_INTEGER);
	}

	const index = Math.abs(hash) % AVATAR_COLORS.length;
	return AVATAR_COLORS[index];
};

const getBorderRadius = (
	size: keyof typeof avatarSizeMap,
	shape: 'circle' | 'rect'
): string => {
	if (shape === 'circle') {
		return theme.units.radius.full;
	}

	switch (size) {
		case 'xl':
			return theme.units.radius.radius16;
		case 'lg':
		case 'md':
			return theme.units.radius.radius8;
		case 'sm':
			return theme.units.radius.radius6;
		default:
			return theme.units.radius.radius4;
	}
};

const getBackgroundColor = (profile: string | null, seed: string): string => {
	if (profile) {
		return 'transparent';
	}

	if (seed) {
		return getColorFromSeed(seed);
	}

	return theme.color.bg.iPrimary;
};

const getBorderColor = (profile: string | null): string => {
	return profile ? theme.color.border.primary : 'transparent';
};

export const AvatarContainer = styled.div<
	Omit<AvatarProps, 'initial'> & { $seed: string }
>`
	display: flex;
	justify-content: center;
	align-items: center;
	height: ${({ size }) => avatarSizeMap[size]};
	width: ${({ size }) => avatarSizeMap[size]};
	background-color: ${({ profile, $seed }) =>
		getBackgroundColor(profile, $seed)};
	border: 1px solid ${({ profile }) => getBorderColor(profile)};
	border-radius: ${({ size, shape }) => getBorderRadius(size, shape)};

	img {
		width: 100%;
		height: 100%;
		border-radius: inherit;
	}
`;
