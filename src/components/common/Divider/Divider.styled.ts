import styled from 'styled-components';
import theme from '@styles/theme';
import type { DividerProps } from './Divider';

const dividerSizeMap = {
	xl: '8px',
	lg: '4px',
	md: '2px',
	sm: '1px',
};

export const DividerContainer = styled.div<Omit<DividerProps, 'size'>>`
	padding: ${(props) => (props.padding ? `${props.padding}px 0` : '0')};
`;

export const DividerWrapper = styled.div<DividerProps>`
	border-bottom: ${(props) => dividerSizeMap[props.size]} solid
		${theme.color.border.tertiary};
	height: ${(props) => dividerSizeMap[props.size]};
`;
