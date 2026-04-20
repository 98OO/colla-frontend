import { styled } from 'styled-components';
import { MODAL_WIDTH, MODAL_HEIGHT } from '@styles/layout';
import theme from '@styles/theme';

export const ChatRoomCreationModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	width: ${`${MODAL_WIDTH}px`};
	height: ${`${MODAL_HEIGHT}px`};
	gap: ${theme.units.spacing.space8};
	padding: ${theme.units.spacing.space16} 0;
`;
