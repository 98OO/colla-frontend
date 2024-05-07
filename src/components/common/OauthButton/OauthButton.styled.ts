import styled from 'styled-components';
import theme from '@styles/theme';

export const OauthButtonWrapper = styled.button`
	width: 392px;
	height: ${theme.units.spacing.space44};
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
