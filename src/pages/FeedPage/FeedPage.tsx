import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Divider from '@components/common/Divider/Divider';
import Heading from '@components/common/Heading/Heading';
import Select from '@components/common/Select/Select';
import Feed from '@components/Feed/Feed';
import { queryClient } from '@hooks/queries/common/queryClient';
import useFeedsQuery from '@hooks/queries/Feed/useFeedsQuery';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import { FEED_SELECT_MAP } from '@constants/feed';
import type { FeedData, SelectType } from '@type/feed';
import * as S from './FeedPage.styled';

const FeedPage = () => {
	const { userStatus } = useUserStatusQuery();
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

	if (!teamspaceId) return <div>Loading..</div>;

	return (
		<S.Container>
			<S.FeedHeaderContainer>
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
			<S.FeedsWrapper>
				<InfiniteScroll
					loadMore={() => {
						if (!isFetching) fetchNextPage();
					}}
					hasMore={hasNextPage}
					useWindow={false}>
					{feeds?.pages.map((pageData) => {
						return pageData.content.feeds.map((feedData: FeedData) => (
							<Feed key={feedData.feedId} feedData={feedData} />
						));
					})}
				</InfiniteScroll>
			</S.FeedsWrapper>
		</S.Container>
	);
};

export default FeedPage;
