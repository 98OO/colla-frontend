import { useEffect, useRef, useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Editor from '@components/Post/Editor/Editor';
import usePostEditor from '@hooks/post/usePostEditor';
import useCollectSubTaskMutation from '@hooks/queries/Feed/Collect/useCollectSubTaskMutation';
import { useLastSeenTeamspaceId } from '@hooks/user/useLastSeenTeamspaceId';
import * as S from './SubTaskDetail.styled';

interface SubTaskEditorProps {
	feedId: number;
	title?: string | null;
}

const SubTaskEditor = ({ feedId, title: savedTitle }: SubTaskEditorProps) => {
	const { editorRef, appendImageFile, resolveEditorImageUrls } = usePostEditor();
	const teamspaceId = useLastSeenTeamspaceId();
	const { mutateCollectSubTask } = useCollectSubTaskMutation(teamspaceId, feedId);

	const [title, setTitle] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const isSubmittingRef = useRef(false);

	useEffect(() => {
		if (savedTitle !== undefined) setTitle(savedTitle);
	}, [savedTitle]);

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const handleSubmitSubTask = async () => {
		if (isSubmittingRef.current) return;

		isSubmittingRef.current = true;
		setIsSubmitting(true);

		try {
			const result = await resolveEditorImageUrls();
			if (!result) return;

			const { content } = result;

			await mutateCollectSubTask({
				teamspaceId,
				feedId,
				title,
				content: content === '<p></p>' ? null : content,
			});
		} finally {
			isSubmittingRef.current = false;
			setIsSubmitting(false);
		}
	};

	return (
		<S.SubTaskPostContainer>
			<S.PostInput
				placeholder='제목을 입력해주세요'
				value={title || ''}
				onChange={handleTitleChange}
				maxLength={50}
			/>
			<S.EditorContainer>
				<Editor editorRef={editorRef} appendImageFile={appendImageFile} />
			</S.EditorContainer>
			<Flex justify='flex-end'>
				<Button
					label='수정'
					variant='primary'
					size='md'
					onClick={handleSubmitSubTask}
					disabled={isSubmitting}
				/>
			</Flex>
		</S.SubTaskPostContainer>
	);
};

export default SubTaskEditor;
