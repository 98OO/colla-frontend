import { styled, css } from 'styled-components';
import theme from '@styles/theme';

export const DateField = styled.div`
	position: relative;
`;

export const DatePickerButton = styled.button`
	width: 280px;
	height: ${theme.units.spacing.space32};
	background-color: ${theme.color.bg.primary};
	border: 1px solid ${theme.color.border.tertiary};
	border-radius: ${theme.units.radius.radius6};
	cursor: pointer;

	&:hover {
		background-color: ${theme.color.bg.secondary};
	}
`;

export const CalendarContainer = styled.div<{ isOpen: boolean }>`
	position: absolute;
	top: calc(100% + ${theme.units.spacing.space4});
	left: 0;
	display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
	flex-direction: column;
	align-items: center;
	gap: ${theme.units.spacing.space12};
	width: 280px;
	padding: ${theme.units.spacing.space12};
	border: 1px solid ${theme.color.border.tertiary};
	border-radius: ${theme.units.radius.radius6};
	box-shadow: ${theme.elevation.shadow.shadow2};
	background-color: ${theme.color.bg.primary};
	z-index: ${theme.elevation.zIndex.DIALOG};
`;

export const CalendarHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;

export const Month = styled.div`
	color: ${theme.color.text.primary};
	font-size: ${theme.typography.fontSize.body.lg};
	font-weight: ${theme.typography.fontWeight.medium};
`;

export const WeeksWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-gap: ${theme.units.spacing.space6};
`;

export const EmptyCell = styled.div`
	width: ${theme.units.spacing.space32};
	height: ${theme.units.spacing.space32};
`;

export const Cell = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: ${theme.units.radius.radius4};
	width: ${theme.units.spacing.space32};
	height: ${theme.units.spacing.space32};
	font-size: ${theme.typography.fontSize.body.md};
`;

export const DateCell = styled(Cell)<{
	isDisabled: boolean;
	isSelected: boolean;
}>`
	${({ isDisabled }) =>
		isDisabled &&
		css`
			pointer-events: none;
			color: ${theme.color.text.disabled};
		`}

	${({ isSelected }) =>
		isSelected &&
		css`
			color: ${theme.color.text.iInverse};
			background-color: ${theme.color.bg.iPrimary};
		`}

	${({ isSelected }) =>
		!isSelected &&
		css`
			cursor: pointer;

			&:hover {
				background-color: ${theme.color.bg.secondary};
			}
		`}
`;
