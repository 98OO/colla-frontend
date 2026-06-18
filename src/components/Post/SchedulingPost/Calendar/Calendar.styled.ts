import { styled } from 'styled-components';
import theme from '@styles/theme';

export const CalendarContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${theme.units.spacing.space28};
`;

export const Month = styled.div`
	color: ${theme.color.text.primary};
	font-size: ${theme.typography.fontSize.header.sm};
	font-weight: ${theme.typography.fontWeight.semiBold};
`;

export const CalendarGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-gap: ${theme.units.spacing.space6};
`;

export const WeekDaysWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 60px;
	height: 60px;
	color: ${theme.color.text.secondary};
`;
