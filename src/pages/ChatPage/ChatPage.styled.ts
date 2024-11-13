import { styled } from 'styled-components';
import theme from '@styles/theme';

export const ChatRoomListContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 398px;
	min-width: 398px;
	height: calc(100vh - 64px);
	border-right: 1px solid ${theme.color.border.tertiary};
	position: relative;

	@media (max-width: 900px) {
		width: 104px;
		min-width: 104px;
	}
`;

export const ChatPageHeader = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	height: 74px;
	padding: 10px 18px;
	border-bottom: 1px solid ${theme.color.border.tertiary};
`;

export const UsernameFlex = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	column-gap: 2px;

	@media (max-width: 900px) {
		display: none;
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
