import { useEffect, useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Editor from '@components/Post/Editor/Editor';
import usePostEditor from '@hooks/post/usePostEditor';
import useCollectSubTaskMutation from '@hooks/queries/Feed/Collect/useCollectSubTaskMutation';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import * as S from './SubTaskDetail.styled';

interface SubTaskEditorProps {
	feedId: number;
	title?: string | null;
}

const SubTaskEditor = ({ feedId, title: savedTitle }: SubTaskEditorProps) => {
	const { editorRef, appendImageFile } = usePostEditor();
	const { userStatus } = useUserStatusQuery();
	const { mutateCollectSubTask } = useCollectSubTaskMutation(
		userStatus?.profile.lastSeenTeamspaceId,
		feedId
	);

	const [title, setTitle] = useState<string | null>(null);

	useEffect(() => {
		if (savedTitle !== undefined) setTitle(savedTitle);
	}, [savedTitle]);

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
				<Button label='수정' variant='primary' size='md' onClick={handleSubmitSubTask} />
			</Flex>
		</S.SubTaskPostContainer>
	);
};

export default SubTaskEditor;
