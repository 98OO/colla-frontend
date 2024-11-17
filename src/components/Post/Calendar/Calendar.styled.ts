import { styled } from 'styled-components';
import theme from '@styles/theme';

export const CalendarContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${theme.units.spacing.space28};
`;

export const WeeksWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-gap: ${theme.units.spacing.space6};
`;

export const Month = styled.div`
	color: ${theme.color.text.primary};
	font-size: ${theme.typography.fontSize.header.sm};
	font-weight: ${theme.typography.fontWeight.semiBold};
`;

export const HeaderWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 80px;
	height: 80px;
	color: ${theme.color.text.secondary};
`;

export const DateWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 80px;
	height: 80px;
`;

export const Date = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
`;
