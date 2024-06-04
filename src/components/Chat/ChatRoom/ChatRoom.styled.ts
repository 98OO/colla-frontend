import { styled } from 'styled-components';
import theme from '@styles/theme';

export const ChatRoomContainer = styled.div.withConfig({
	shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>`
	display: flex;
	justify-content: space-between;

	padding: ${theme.units.spacing.space24} ${theme.units.spacing.space10};
	border-bottom: 1px solid ${theme.color.border.tertiary};

	background-color: ${({ active }) =>
		active ? theme.color.bg.iSecondaryHover : 'transparent'};

	&:hover {
		background-color: ${theme.color.bg.iSecondaryHover};
	}
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
