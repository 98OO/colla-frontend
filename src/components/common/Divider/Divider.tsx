import type { dividerSize } from '@type/size';
import * as S from './Divider.styled';

export interface DividerProps {
	size: dividerSize;
}

const Divider = (props: DividerProps) => {
	const { size } = props;
	return <S.DividerContainer size={size} />;
};

export default Divider;
