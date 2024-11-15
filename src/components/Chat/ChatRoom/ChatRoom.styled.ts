import { styled } from 'styled-components';
import theme from '@styles/theme';

export const ChatRoomContainer = styled.div.withConfig({
	shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>`
	display: flex;
	gap: ${theme.units.spacing.space10};

	padding: ${theme.units.spacing.space16} ${theme.units.spacing.space20};
	cursor: pointer;
	background-color: ${({ active }) =>
		active ? theme.color.bg.iSecondaryHover : 'transparent'};

	&:hover {
		background-color: ${theme.color.bg.iSecondaryHover};
	}
	@media (max-width: 1440px) {
		width: 265px;
	}

	@media (max-width: 900px) {
		width: auto;
		padding: ${theme.units.spacing.space16} ${theme.units.spacing.space8};
		justify-content: center;

		> *:not(:first-child) {
			display: none;
		}
	}
`;

export const MessageContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space10};
	justify-content: center;
	width: 230px;
	flex-grow: 1;

	@media (max-width: 1440px) {
		width: 60px;
	}

	> * {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
`;

export const DateWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	white-space: nowrap;
`;

export const ChatCountWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 24px;
	min-width: 25px;

	border-radius: ${theme.units.radius.full};
	background-color: ${theme.color.bg.iDestructive};
	padding: 0 ${theme.units.spacing.space6};
`;
