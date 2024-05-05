import styled from 'styled-components';

export const OauthButtonWrapper = styled.button`
	width: 392px;
	height: 40px;
	position: relative;
	border-radius: 6px;
	border: none;
	background-color: none;

	svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;
