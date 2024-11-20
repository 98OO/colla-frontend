import { useEffect, useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Divider from '@components/common/Divider/Divider';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import FeedAuthor from '@components/Feed/FeedAuthors/FeedAuthor';
import Editor from '@components/Post/Editor/Editor';
import usePostEditor from '@hooks/post/usePostEditor';
import useCollectSubTaskMutation from '@hooks/queries/Feed/Collect/useCollectSubTaskMutation';
import useCollectSubTaskQuery from '@hooks/queries/Feed/Collect/useCollectSubTaskQuery';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import { getFormattedDate } from '@utils/getFormattedDate';
import type { Author } from '@type/feed';
import * as S from './SubTaskDetail.styled';

interface SubTaskPostProps {
	subTaskAuthor: Author;
	feedId: number;
}

const SubTaskDetail = ({ subTaskAuthor, feedId }: SubTaskPostProps) => {
	const { id } = subTaskAuthor;
	const { editorRef, appendImageFile } = usePostEditor();
	const { userStatus } = useUserStatusQuery();
	const { subTask } = useCollectSubTaskQuery(
		userStatus?.profile.lastSeenTeamspaceId,
		feedId,
		id
	);
	const [title, setTitle] = useState<string | null>(null);
	const { mutateCollectSubTask } = useCollectSubTaskMutation(
		userStatus?.profile.lastSeenTeamspaceId,
		feedId
	);

	useEffect(() => {
		if (subTask) setTitle(subTask.title);
	}, [subTask]);

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const handleSubmitSubTask = async () => {
		if (editorRef.current && editorRef.current.getHTML() !== undefined) {
			const content = editorRef.current.getHTML();

			await mutateCollectSubTask({
				teamspaceId: userStatus?.profile.lastSeenTeamspaceId,
				feedId,
				title,
				content: content === '<p></p>' ? null : content,
			});
		}
	};

	return (
		<Flex>
			{id === userStatus?.profile.userId ? (
				<S.SubTaskPostContainer>
					<S.PostInput
						placeholder='제목을 입력해주세요'
						value={title || ''}
						onChange={handleTitleChange}
						maxLength={50}
					/>
					<Editor editorRef={editorRef} appendImageFile={appendImageFile} />
					<Flex justify='flex-end'>
						<Button
							label='수정'
							variant='primary'
							size='md'
							onClick={handleSubmitSubTask}
						/>
					</Flex>
				</S.SubTaskPostContainer>
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
								<div
									dangerouslySetInnerHTML={{ __html: subTask.content || '' }}
								/>
							</S.DetailWrapper>
						</Flex>
					</Flex>
				)
			)}
		</Flex>
	);
};

export default SubTaskDetail;
