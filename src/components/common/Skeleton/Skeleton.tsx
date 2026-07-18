import * as S from './Skeleton.styled';

export interface SkeletonProps {
	width?: number | string;
	height?: number | string;
	radius?: number | string;
}

const Skeleton = ({ width, height, radius }: SkeletonProps) => {
	return <S.SkeletonBox $width={width} $height={height} $radius={radius} aria-hidden />;
};

export default Skeleton;
