import styled from 'styled-components';
import theme from '@styles/theme';

export const SchedulingPostContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 680px;
	gap: ${theme.units.spacing.space32};
`;

export const PostInput = styled.input`
	font-size: ${theme.typography.fontSize.header.sm};
	font-weight: ${theme.typography.fontWeight.semiBold};
	border: none;
	outline: none;
`;

export const DatePickerWrapper = styled.div`
	position: relative;
`;
