import Skeleton from '@components/common/Skeleton/Skeleton';
import useDelayedVisibility from '@hooks/common/useDelayedVisibility';
import type { FeedMenuType } from '@type/feed';
import * as S from './PostLoadingFallback.styled';

const FALLBACK_DELAY_MS = 200;

interface PostLoadingFallbackProps {
	feedType: FeedMenuType;
}

const EditorBlocks = () => (
	<>
		<S.EditorBlock>
			<Skeleton height='100%' radius={12} />
		</S.EditorBlock>
		<Skeleton height={120} radius={12} />
		<S.Actions>
			<Skeleton width={64} height={40} radius={6} />
		</S.Actions>
	</>
);

const NormalPostFallback = () => (
	<>
		<Skeleton width='60%' height={30} radius={10} />
		<EditorBlocks />
	</>
);

const CollectPostFallback = () => (
	<>
		<S.CollectHeader>
			<Skeleton width='60%' height={30} radius={10} />
			<Skeleton width='44%' height={32} radius={6} />
		</S.CollectHeader>
		<EditorBlocks />
	</>
);

const SchedulingPostFallback = () => (
	<>
		<S.CalendarSection>
			<Skeleton width={112} height={24} radius={12} />
			<S.CalendarContent>
				<Skeleton width={32} height={32} radius='50%' />
				<Skeleton width={456} height={456} radius={12} />
				<Skeleton width={32} height={32} radius='50%' />
			</S.CalendarContent>
		</S.CalendarSection>
		<S.Actions>
			<Skeleton width={64} height={40} radius={6} />
		</S.Actions>
	</>
);

const getPostFallback = (feedType: FeedMenuType) => {
	if (feedType === 'scheduling') return <SchedulingPostFallback />;
	if (feedType === 'normal') return <NormalPostFallback />;

	return <CollectPostFallback />;
};

const PostLoadingFallback = ({ feedType }: PostLoadingFallbackProps) => {
	const isVisible = useDelayedVisibility(FALLBACK_DELAY_MS);

	return (
		<S.Container
			$feedType={feedType}
			$isVisible={isVisible}
			role={isVisible ? 'status' : undefined}
			aria-label={isVisible ? '게시글 작성 화면을 불러오는 중' : undefined}
			aria-hidden={!isVisible}>
			{isVisible && getPostFallback(feedType)}
		</S.Container>
	);
};

export default PostLoadingFallback;
