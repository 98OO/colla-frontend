import { styled } from 'styled-components';
import type { HeadingProps } from './Heading';

export const HeadingWrapper = styled.h1<HeadingProps>`
	font-size: ${(props) => props.theme.typography.fontSize.header[props.size]};
	font-weight: ${(props) => props.theme.typography.fontWeight.semiBold};
	color: ${(props) => props.color && props.theme.color.text[props.color]};
`;
