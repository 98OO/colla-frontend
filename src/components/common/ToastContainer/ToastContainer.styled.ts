import { styled } from 'styled-components';

export const ToastContainerWrapper = styled.div`
	position: fixed;
	bottom: 50px;
	display: flex;
	flex-direction: column-reverse;
	justify-content: center;
	align-items: center;
	gap: ${(props) => props.theme.units.spacing.space12};
	z-index: 1001;
`;
