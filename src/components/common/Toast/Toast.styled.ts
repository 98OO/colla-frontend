import styled from 'styled-components';
import { fadeIn, fadeOut } from '@styles/animations';
import type { ToastProps } from './Toast';

type toastWrapperProps = Pick<ToastProps, 'isActive'>;

export const ToastWrapper = styled.div<toastWrapperProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: ${(props) => props.theme.units.spacing.space12};
	padding: ${(props) =>
		`${props.theme.units.spacing.space14} ${props.theme.units.spacing.space20}`};

	background-color: ${(props) => `${props.theme.color.bg.iInverseStrong}90`};

	backdrop-filter: blur(8px);
	-webkit-backdrop-filter: blur(8px);
	border-radius: ${(props) => props.theme.units.radius.radius12};
	box-shadow: ${(props) => props.theme.elevation.shadow.shadow8};
	animation: ${(props) => (props.isActive ? fadeIn : fadeOut)} 0.4s ease-out;
`;

export const ToastTextWrapper = styled.div`
	max-width: 500px;
	line-height: 1.2;
`;
