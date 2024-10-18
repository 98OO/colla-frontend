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
