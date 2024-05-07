import { ElementType } from 'react';
import type { FlexStyleProps } from './Flex.styled';
import { FlexWrapper } from './Flex.styled';

interface FlexProps extends FlexStyleProps {
	as?: ElementType;
	children?: React.ReactNode;
}

const Flex = ({ as = 'div', children, ...props }: FlexProps) => {
	return (
		<FlexWrapper as={as} {...props}>
			{children}
		</FlexWrapper>
	);
};

export default Flex;
