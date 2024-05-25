import styled from 'styled-components';
import { fadeIn, fadeOut } from '@styles/animations';
import type { ToastProps } from './Toast';

type toastWrapperProps = Pick<ToastProps, 'isActive'>;

export const ToastWrapper = styled.div<toastWrapperProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: ${(props) => props.theme.units.spacing.space12};
	height: ${(props) => props.theme.units.spacing.space32};
	padding: ${(props) =>
		`${props.theme.units.spacing.space12} ${props.theme.units.spacing.space16}`};
	background-color: ${(props) => props.theme.color.bg.iInverseStrong};
	border-radius: ${(props) => props.theme.units.radius.radius6};
	box-shadow: ${(props) => props.theme.elevation.shadow.shadow8};
	animation: ${(props) => (props.isActive ? fadeIn : fadeOut)} 0.4s ease-out;
`;
