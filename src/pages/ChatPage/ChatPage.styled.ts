import { styled } from 'styled-components';
import theme from '@styles/theme';

export const ChatRoomListContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 460px;
	height: calc(100vh - 64px);
	border-right: 1px solid ${theme.color.border.tertiary};
	position: relative;

	@media (max-width: 1440px) {
		width: 250px;
	}
`;

export const ChatRoomListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	min-height: calc(100vh - 160px);
	overflow-y: auto;

	&::-webkit-scrollbar {
		width: 4px;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: ${theme.units.radius.radius20};
		background: ${theme.color.border.secondary};
	}
`;

export const ChatRoomModal = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	top: 50%;
	left: 50%;
	width: 400px;
	height: 180px;
	transform: translate(-50%, -50%);

	border-radius: ${theme.units.radius.radius16};
	z-index: ${theme.elevation.zIndex.MODAL};
	gap: ${theme.units.spacing.space12};
	background-color: ${theme.color.bg.primary};
	box-shadow: ${theme.elevation.shadow.shadow16};

	@media (max-width: 1440px) {
		width: 240px;
	}
`;
