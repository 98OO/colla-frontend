import { lazy, Suspense } from 'react';
import Divider from '@components/common/Divider/Divider';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import SanitizedHtml from '@components/common/SanitizedHtml/SanitizedHtml';
import SubTaskEditorLoadingFallback from '@components/Feed/Detail/SubTask/SubTaskEditorLoadingFallback';
import FeedAuthor from '@components/Feed/FeedAuthors/FeedAuthor';
import useCollectSubTaskQuery from '@hooks/queries/Feed/Collect/useCollectSubTaskQuery';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import { getFormattedDate } from '@utils/getFormattedDate';
import type { Author } from '@type/feed';
import * as S from './SubTaskDetail.styled';

const SubTaskEditor = lazy(() => import('./SubTaskEditor'));

interface SubTaskPostProps {
	subTaskAuthor: Author;
	feedId: number;
}

const SubTaskDetail = ({ subTaskAuthor, feedId }: SubTaskPostProps) => {
	const { id } = subTaskAuthor;
	const { userStatus } = useUserStatusQuery();
	const { subTask } = useCollectSubTaskQuery(userStatus?.profile.lastSeenTeamspaceId, feedId, id);

	return (
		<Flex>
			{id === userStatus?.profile.userId ? (
				<Suspense fallback={<SubTaskEditorLoadingFallback />}>
					<SubTaskEditor feedId={feedId} title={subTask?.title} />
				</Suspense>
			) : (
				subTask && (
					<Flex direction='column' gap='24'>
						<FeedAuthor
							profile={subTask.author.profileImageUrl}
							initial={subTask.author.username.charAt(0)}
							title={subTask.author.username}
							createdAt={getFormattedDate(subTask.updatedAt, 'detail')}
							tag={subTask.author.tag?.name || ''}
						/>
						<Flex direction='column' gap='12'>
							{subTask.title && <Heading size='xs'>{subTask.title}</Heading>}
							<Divider size='sm' />
							<S.DetailWrapper>
								<SanitizedHtml html={subTask.content} />
							</S.DetailWrapper>
						</Flex>
					</Flex>
				)
			)}
		</Flex>
	);
};

export default SubTaskDetail;
