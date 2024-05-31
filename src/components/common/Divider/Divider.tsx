import type { dividerSize } from '@type/size';
import * as S from './Divider.styled';

export interface DividerProps {
	size: dividerSize;
	padding?: number;
}

const Divider = (props: DividerProps) => {
	const { size, padding } = props;
	return (
		<S.DividerContainer padding={padding}>
			<S.DividerWrapper size={size} />
		</S.DividerContainer>
	);
};

export default Divider;
