import Flex from '@components/common/Flex/Flex';
import Skeleton from '@components/common/Skeleton/Skeleton';
import * as S from './FeedSkeletonList.styled';

const FeedSkeleton = () => (
	<S.FeedSkeleton>
		<S.FeedSkeletonContent>
			<Flex gap='8' align='center'>
				<Skeleton width={40} height={40} radius='50%' />
				<Flex direction='column' gap='8'>
					<Skeleton width={120} height={16} />
					<Skeleton width={80} height={12} />
				</Flex>
			</Flex>
			<Flex direction='column' gap='12'>
				<Skeleton width='40%' height={20} />
				<S.FeedSkeletonBody>
					<Skeleton width='100%' height={16} />
					<Skeleton width='95%' height={16} />
					<Skeleton width='98%' height={16} />
					<Skeleton width='60%' height={16} />
				</S.FeedSkeletonBody>
			</Flex>
		</S.FeedSkeletonContent>
		<S.FeedSkeletonDivider />
		<S.FeedSkeletonFooter>
			<Skeleton width={56} height={24} />
			<Skeleton width='70%' height={16} />
		</S.FeedSkeletonFooter>
	</S.FeedSkeleton>
);

interface FeedSkeletonListProps {
	count?: number;
}

const FeedSkeletonList = ({ count = 2 }: FeedSkeletonListProps) => (
	<S.FeedSkeletonList role='status' aria-label='피드를 불러오는 중'>
		{Array.from({ length: count }, (_, index) => (
			<FeedSkeleton key={index} />
		))}
	</S.FeedSkeletonList>
);

export default FeedSkeletonList;
