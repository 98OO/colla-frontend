import styled from 'styled-components';

const CIRCLE_SIZE = '18px';
const WRAPPER_PADDING = '2px';

export const ToggleWrapper = styled.div<{ state: boolean }>`
	position: relative;
	display: flex;
	align-items: center;
	width: 44px;
	height: 22px;
	padding: 0 ${WRAPPER_PADDING};
	background-color: ${(props) =>
		props.state
			? props.theme.color.bg.iPrimary
			: props.theme.color.bg.disabled};
	border: ${(props) =>
		props.state ? 'none' : `2px solid ${props.theme.color.border.secondary}`};
	border-radius: ${(props) => props.theme.units.radius.full};
	transition: background-color 0.2s;
	cursor: pointer;
`;

export const ToggleCircle = styled.div<{ state: boolean }>`
	position: absolute;
	top: 50%;
	width: ${CIRCLE_SIZE};
	height: ${CIRCLE_SIZE};
	background-color: ${(props) => props.theme.color.bg.iInverse};
	border-radius: ${(props) => props.theme.units.radius.full};
	box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
	left: ${({ state }) =>
		state
			? `calc(100% - ${CIRCLE_SIZE} - ${WRAPPER_PADDING})`
			: `${WRAPPER_PADDING}`};
	transform: translateY(-50%);
	transition: left 0.2s ease;
`;
