import { styled } from 'styled-components';
import theme from '@styles/theme';

interface DateCellWrapperProps {
	isPast: boolean;
	isToday: boolean;
}

export const EmptyCellWrapper = styled.div`
	width: 60px;
	height: 60px;
`;

export const DateCellWrapper = styled.div<DateCellWrapperProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	width: 40px;
	height: 40px;
	margin: 10px;
	border-radius: ${theme.units.radius.full};
	cursor: pointer;
	transition: all 0.1s ease;
	user-select: none;

	&:hover {
		background-color: ${theme.color.bg.iPrimary};
		color: ${theme.color.text.iInverse};
	}

	${({ isPast }) =>
		isPast &&
		`
			pointer-events: none;
			color: ${theme.color.text.disabled};
		`}

	${({ isToday }) =>
		isToday &&
		`
			color: ${theme.color.text.iPrimary}
		`}
`;
