import styled from 'styled-components';

export interface FlexStyleProps {
	direction?: 'row' | 'column';
	wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
	basis?: 'auto' | '0' | '200px';
	grow?: string;
	shrink?: string;
	align?:
		| 'normal'
		| 'stretch'
		| 'center'
		| 'start'
		| 'end'
		| 'flex-start'
		| 'flex-end'
		| 'self-start'
		| 'self-end'
		| 'baseline'
		| 'inherit'
		| 'initial'
		| 'unset';
	justify?:
		| 'center'
		| 'start'
		| 'flex-start'
		| 'end'
		| 'flex-end'
		| 'left'
		| 'right'
		| 'normal'
		| 'space-between'
		| 'space-around'
		| 'space-evenly'
		| 'stretch'
		| 'inherit'
		| 'initial'
		| 'revert'
		| 'unset';
	gap?: string;
	margin?: string;
	marginRight?: string;
	marginTop?: string;
	marginLeft?: string;
	marginBottom?: string;
	padding?: string;
	paddingTop?: string;
	paddingRight?: string;
	paddingBottom?: string;
	paddingLeft?: string;
	border?: string;
	width?: string;
	height?: string;
	position?: 'static' | 'absolute' | 'relative' | 'fixed' | 'inherit';
}

export const FlexWrapper = styled.div<FlexStyleProps>`
	display: flex;
	flex-direction: ${({ direction }) => direction || 'row'};
	flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
	flex-basis: ${({ basis }) => basis || 'auto'};
	flex-grow: ${({ grow }) => grow || '0'};
	flex-shrink: ${({ shrink }) => shrink || '1'};
	align-items: ${({ align }) => align || 'stretch'};
	justify-content: ${({ justify }) => justify || 'flex-start'};
	gap: ${({ gap }) => `${gap}px` || '0'};
	margin: ${({ margin }) => `${margin}px` || '0'};
	margin-right: ${({ marginRight }) => `${marginRight}px` || '0'};
	margin-top: ${({ marginTop }) => `${marginTop}px` || '0'};
	margin-left: ${({ marginLeft }) => `${marginLeft}px` || '0'};
	margin-bottom: ${({ marginBottom }) => `${marginBottom}px` || '0'};
	padding: ${({ padding }) => `${padding}px` || '0'};
	padding-top: ${({ paddingTop }) => `${paddingTop}px` || '0'};
	padding-right: ${({ paddingRight }) => `${paddingRight}px` || '0'};
	padding-bottom: ${({ paddingBottom }) => `${paddingBottom}px` || '0'};
	padding-left: ${({ paddingLeft }) => `${paddingLeft}px` || '0'};
	border: ${({ border }) => border || 'none'};
	width: ${({ width }) => `${width}px` || 'auto'};
	height: ${({ height }) => `${height}px` || 'auto'};
	position: ${({ position }) => position || 'static'};
`;
