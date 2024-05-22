import styled from 'styled-components';
import theme from '@styles/theme';
import type { DividerProps } from './Divider';

const dividerSizeMap = {
	xl: '8px',
	lg: '4px',
	md: '2px',
	sm: '1px',
};

export const DividerContainer = styled.div<DividerProps>`
	border-bottom: ${(props) => dividerSizeMap[props.size]} solid
		${theme.color.border.tertiary};
	width: 100%;
	height: ${(props) => dividerSizeMap[props.size]};
`;
