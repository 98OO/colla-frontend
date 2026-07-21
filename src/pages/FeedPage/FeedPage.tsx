import { useCallback, useState } from 'react';
import AsyncBoundary from '@components/common/AsyncBoundary/AsyncBoundary';
import Divider from '@components/common/Divider/Divider';
import Heading from '@components/common/Heading/Heading';
import Select from '@components/common/Select/Select';
import FeedList from '@components/Feed/FeedList/FeedList';
import FeedSkeletonList from '@components/Feed/FeedSkeletonList/FeedSkeletonList';
import useMeasureWidth from '@hooks/common/useMeasureWidth';
import useFeedDrawer from '@hooks/post/useFeedDrawer';
import { queryClient } from '@hooks/queries/common/queryClient';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import { FEED_SELECT_MAP } from '@constants/feed';
import type { SelectType } from '@type/feed';
import * as S from './FeedPage.styled';

const FeedPage = () => {
	const { userStatus } = useUserStatusQuery();
	const { openFeedId, openDrawer, closeDrawer, isDrawerOpen } = useFeedDrawer();
	const { ref: containerRef, width } = useMeasureWidth();

	const teamspaceId = userStatus?.profile.lastSeenTeamspaceId;

	const [selectedType, setSelectedType] = useState('전체');

	const getTypeBySelect = (select: SelectType) => {
		const type = FEED_SELECT_MAP[select];
		if (type === 'ALL') return undefined;
		return type;
	};

	const handleSelect = (index: number) => {
		const select = Object.keys(FEED_SELECT_MAP)[index - 1];
		setSelectedType(select);
		queryClient.invalidateQueries({
			queryKey: ['feeds'],
		});
	};

	const getAdjustedWidth = useCallback((refWidth: number) => {
		const space = Math.max((refWidth - 760) / 2, 0);
		return space > 200 ? 200 : space;
	}, []);

	const type = getTypeBySelect(selectedType);

	return (
		<S.Container ref={containerRef}>
			<S.FeedHeaderContainer isOpen={openFeedId !== null} adjustedWidth={getAdjustedWidth(width)}>
				<S.FeedHeader>
					<Heading size='xs' color='primary'>
						피드
					</Heading>
					<S.SelectWrapper>
						<Select
							size='sm'
							options={Object.keys(FEED_SELECT_MAP)}
							select={selectedType}
							setSelect={handleSelect}
						/>
					</S.SelectWrapper>
				</S.FeedHeader>
				<Divider size='sm' />
			</S.FeedHeaderContainer>
			<S.FeedsWrapper isOpen={openFeedId !== null} adjustedWidth={getAdjustedWidth(width)}>
				{teamspaceId ? (
					<AsyncBoundary loadingFallback={<FeedSkeletonList />} resetKeys={[teamspaceId, type]}>
						<FeedList
							teamspaceId={teamspaceId}
							type={type}
							isDrawerOpen={isDrawerOpen}
							openDrawer={openDrawer}
							closeDrawer={closeDrawer}
						/>
					</AsyncBoundary>
				) : (
					<FeedSkeletonList />
				)}
			</S.FeedsWrapper>
		</S.Container>
	);
};

export default FeedPage;
