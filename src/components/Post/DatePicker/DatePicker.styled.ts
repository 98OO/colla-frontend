import { styled, css } from 'styled-components';
import theme from '@styles/theme';

export const DatePickerButton = styled.button`
	width: 260px;
	height: ${theme.units.spacing.space28};
	background-color: ${theme.color.bg.tertiary};
	border: 1px solid ${theme.color.border.tertiary};
	border-radius: ${theme.units.radius.radius6};
`;

export const TimeToggleWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: ${theme.units.spacing.space16};
`;

export const CalendarContainer = styled.div<{ isOpen: boolean }>`
	position: absolute;
	right: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${theme.units.spacing.space12};
	width: 280px;
	padding: ${theme.units.spacing.space12};
	border: 1px solid ${theme.color.border.tertiary};
	border-radius: ${theme.units.radius.radius6};
	box-shadow: ${theme.elevation.shadow.shadow2};
	background-color: ${theme.color.bg.primary};

	display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
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
`;
