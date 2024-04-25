import type { PropsWithChildren } from 'react';
import type { fontSize } from '@type/size';
import type { textColor } from '@type/tokens';
import * as S from './Text.styled';

type fontWeight = 'regular' | 'medium' | 'semiBold' | 'bold';

export interface TextProps {
	as?: 'p' | 'span' | 'strong' | 'small';
	size: fontSize;
	weight: fontWeight;
	color?: textColor;
	children: string;
}

const Text = (props: PropsWithChildren<TextProps>) => {
	const {
		as = 'p',
		size,
		weight,
		color = 'primary',
		children,
		...attributes
	} = props;

	return (
		<S.TextWrapper
			as={as}
			size={size}
			weight={weight}
			color={color}
			{...attributes}>
			{children}
		</S.TextWrapper>
	);
};

export default Text;
