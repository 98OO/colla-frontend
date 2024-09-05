import { styled } from 'styled-components';
import theme from '@styles/theme';

export const ChatRoomContainer = styled.div.withConfig({
	shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>`
	display: flex;
	gap: ${theme.units.spacing.space10};

	padding: ${theme.units.spacing.space24} ${theme.units.spacing.space10};
	border-bottom: 1px solid ${theme.color.border.tertiary};

	background-color: ${({ active }) =>
		active ? theme.color.bg.iSecondaryHover : 'transparent'};

	&:hover {
		background-color: ${theme.color.bg.iSecondaryHover};
	}
`;

export const MessageContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.units.spacing.space10};
	justify-content: center;
	width: 315px;
	flex-grow: 1;

	p {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	@media (max-width: 1440px) {
		width: 100px;
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
