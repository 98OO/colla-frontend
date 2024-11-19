import styled, { css } from 'styled-components';
import theme from '@styles/theme';
import type { progressChipProps } from './ProgressChip';

const progressBackGroundColor = {
	DEFALUT: `${theme.color.bg.secondary}`,
	REQUEST: '#02B1FD',
	PENDING: '#00B01B',
	FEEDBACK: '#FE7901',
	COMPLETED: '#41299E',
};

export const ProgressChipContainer = styled.div.withConfig({
	shouldForwardProp: (prop) => !['status', 'type'].includes(prop),
})<progressChipProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 64px;
	height: 24px;

	font-size: ${theme.typography.fontSize.body.sm};
	font-weight: ${theme.typography.fontWeight.semiBold};
	border-radius: ${theme.units.radius.radius16};

	${({ type, status }) => css`
		background-color: ${status
			? progressBackGroundColor[type]
			: progressBackGroundColor.DEFALUT};

		color: ${status ? theme.color.text.iInverse : theme.color.text.secondary};
	`}
`;
