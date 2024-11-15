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
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: ${`${CHAT_ROOM_CREATION_MODAL_WIDTH}px`};
	height: ${`${CHAT_ROOM_CREATION_MODAL_HEIGHT}px`};

	background-color: ${theme.color.bg.primary};
	border-radius: ${theme.units.radius.radius8};
	box-shadow: ${theme.elevation.shadow.shadow4};
	z-index: ${theme.elevation.zIndex.MENU};
	gap: ${theme.units.spacing.space8};
	padding: ${theme.units.spacing.space16} 0;
`;
