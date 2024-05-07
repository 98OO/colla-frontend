import type { PropsWithChildren } from 'react';
import type { headingSize } from '@type/size';
import type { textColor } from '@type/tokens';
import * as S from './Heading.styled';

export interface HeadingProps {
	size: headingSize;
	color?: textColor;
	children: string;
}

const TAG_BY_SIZE = {
	xxl: 'h1',
	xl: 'h2',
	lg: 'h3',
	md: 'h4',
	sm: 'h5',
	xs: 'h6',
	xxs: 'h6',
} as const;

const Heading = (props: PropsWithChildren<HeadingProps>) => {
	const { size, color = 'primary', children, ...attributes } = props;
	const headingTag = TAG_BY_SIZE[size];

	return (
		<S.HeadingWrapper as={headingTag} size={size} color={color} {...attributes}>
			{children}
		</S.HeadingWrapper>
	);
};

export default Heading;
