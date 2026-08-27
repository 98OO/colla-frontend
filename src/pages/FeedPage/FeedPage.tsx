import { useEffect, useState } from 'react';
import Divider from '@components/common/Divider/Divider';
import Heading from '@components/common/Heading/Heading';
import Select from '@components/common/Select/Select';
import FeedPageContentContainer from '@components/Feed/FeedPageContentContainer/FeedPageContentContainer';
import { queryClient } from '@hooks/queries/common/queryClient';
import { useLastSeenTeamspaceId } from '@hooks/user/useLastSeenTeamspaceId';
import useFeedDetailStore, { clearFeedDetail } from '@stores/feedDetailStore';
import { FEED_SELECT_MAP } from '@constants/feed';
import type { FeedType, SelectType } from '@type/feed';
import * as S from './FeedPage.styled';

const FEED_SELECT_OPTIONS = Object.keys(FEED_SELECT_MAP) as SelectType[];

const toFeedQueryType = (select: SelectType): FeedType | undefined => {
	const feedType = FEED_SELECT_MAP[select];

	return feedType === 'ALL' ? undefined : feedType;
};

const useResetFeedDetail = (teamspaceId?: number, type?: FeedType) => {
	useEffect(() => {
		clearFeedDetail();

		return clearFeedDetail;
	}, [teamspaceId, type]);
};

const FeedPage = () => {
	const teamspaceId = useLastSeenTeamspaceId();
	const isFeedDetailOpen = useFeedDetailStore((state) => state.selectedFeedId !== null);

	const [selectedType, setSelectedType] = useState<SelectType>('전체');

	const feedType = toFeedQueryType(selectedType);

	useResetFeedDetail(teamspaceId, feedType);

	const handleSelect = (index: number) => {
		const select = FEED_SELECT_OPTIONS[index - 1];
		if (!select) return;

		setSelectedType(select);
		queryClient.invalidateQueries({
			queryKey: ['feeds'],
		});
	};

	return (
		<S.Container>
			<S.FeedHeaderContainer $isOpen={isFeedDetailOpen}>
				<S.FeedHeader>
					<Heading size='xs' color='primary'>
						피드
					</Heading>
					<S.SelectWrapper>
						<Select
							size='sm'
							options={FEED_SELECT_OPTIONS}
							select={selectedType}
							setSelect={handleSelect}
						/>
					</S.SelectWrapper>
				</S.FeedHeader>
				<Divider size='sm' />
			</S.FeedHeaderContainer>
			<FeedPageContentContainer
				teamspaceId={teamspaceId}
				isFeedDetailOpen={isFeedDetailOpen}
				feedType={feedType}
			/>
		</S.Container>
	);
};

export default FeedPage;
