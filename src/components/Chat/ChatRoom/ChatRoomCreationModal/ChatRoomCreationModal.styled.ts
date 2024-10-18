import { styled } from 'styled-components';
import {
	CHAT_ROOM_CREATION_MODAL_WIDTH,
	CHAT_ROOM_CREATION_MODAL_HEIGHT,
} from '@styles/layout';
import theme from '@styles/theme';

export const ChatRoomCreationModalContainer = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	width: ${`${CHAT_ROOM_CREATION_MODAL_WIDTH}px`};
	height: ${`${CHAT_ROOM_CREATION_MODAL_HEIGHT}px`};
	z-index: ${theme.elevation.zIndex.MODAL};
	border-radius: ${theme.units.radius.radius16};
	gap: ${theme.units.spacing.space12};
	background-color: ${theme.color.bg.primary};
	box-shadow: ${theme.elevation.shadow.shadow16};
`;
