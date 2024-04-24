import { styled } from 'styled-components';
import type { TextProps } from './Text';

export const TextWrapper = styled.p<TextProps>`
	p&,
	span&,
	strong&,
	small&,
	&& {
		font-size: ${(props) => props.theme.typography.fontSize.body[props.size]};
		font-weight: ${(props) => props.theme.typography.fontWeight[props.weight]};
		color: ${(props) => props.color && props.theme.color.text[props.color]};
	}
`;
