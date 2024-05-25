import styled from 'styled-components';
import theme from '@styles/theme';
import type { AvatarProps } from './Avatar';

const avatarSizeMap = {
	xl: '80px',
	lg: '48px',
	md: '32px',
	sm: '24px',
	xs: '16px',
};

export const AvatarContainer = styled.div<Omit<AvatarProps, 'initial'>>`
	display: flex;
	justify-content: center;
	align-items: center;
	height: ${(props) => avatarSizeMap[props.size]};
	width: ${(props) => avatarSizeMap[props.size]};
	background-color: ${(props) =>
		props.profile == null && `${theme.color.bg.iPrimary}`};

	border: 1px solid
		${(props) =>
			props.profile
				? `${theme.color.border.secondary}`
				: `${theme.color.border.iPrimary}`};

	border-radius: ${(props) =>
		props.shape === 'circle'
			? theme.units.radius.full
			: (() => {
					switch (props.size) {
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
				})()};

	img {
		width: 100%;
		height: 100%;
		border-radius: inherit;
	}
`;
