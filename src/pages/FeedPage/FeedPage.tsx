import { useCallback, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Divider from '@components/common/Divider/Divider';
import Heading from '@components/common/Heading/Heading';
import Select from '@components/common/Select/Select';
import Feed from '@components/Feed/Feed';
import useMeasureWidth from '@hooks/common/useMeasureWidth';
import useFeedDrawer from '@hooks/post/useFeedDrawer';
import { queryClient } from '@hooks/queries/common/queryClient';
import useFeedsQuery from '@hooks/queries/Feed/useFeedsQuery';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import { getSanitizedFeeds } from '@utils/getSanitizedFeeds';
import { FEED_SELECT_MAP } from '@constants/feed';
import type { FeedData, SelectType } from '@type/feed';
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

	const { feeds, hasNextPage, isFetching, fetchNextPage } = useFeedsQuery({
		teamspaceId,
		type: getTypeBySelect(selectedType),
	});

	const getAdjustedWidth = useCallback((refWidth: number) => {
		const space = Math.max((refWidth - 760) / 2, 0);
		return space > 200 ? 200 : space;
	}, []);

	if (!teamspaceId) return <div>Loading..</div>;

	return (
		<S.Container ref={containerRef}>
			<S.FeedHeaderContainer
				isOpen={openFeedId !== null}
				adjustedWidth={getAdjustedWidth(width)}>
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
			<S.FeedsWrapper
				isOpen={openFeedId !== null}
				adjustedWidth={getAdjustedWidth(width)}>
				<InfiniteScroll
					loadMore={() => {
						if (!isFetching) fetchNextPage();
					}}
					hasMore={hasNextPage}
					useWindow={false}>
					{feeds?.pages.map((pageData) => {
						const sanitizedFeeds = getSanitizedFeeds(pageData.content.feeds);

						return sanitizedFeeds.map((feedData: FeedData) => {
							const { feedId } = feedData;
							return (
								<Feed
									key={feedId}
									feedData={feedData}
									isDetailOpen={isDrawerOpen(feedId)}
									openDetail={() => openDrawer(feedId)}
									closeDetail={closeDrawer}
								/>
							);
						});
					})}
				</InfiniteScroll>
			</S.FeedsWrapper>
		</S.Container>
	);
};

export default FeedPage;
