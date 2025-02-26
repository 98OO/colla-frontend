import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/common/Button/Button';
import FileUploadBox from '@components/common/FileUploadBox/FileUploadBox';
import Editor from '@components/Post/Editor/Editor';
import usePostEditor from '@hooks/post/usePostEditor';
import { PATH } from '@constants/path';
import { USER_CONFIRM_MESSAGE } from '@constants/post';
import * as S from './NormalPost.styled';

const NormalPost = () => {
	const navigate = useNavigate();
	const {
		editorRef,
		attachmentFiles,
		appendImageFile,
		appendAttachmentFile,
		deleteAttachmentFile,
		handleDrop,
		handleDragOver,
		handleSubmit: submitNormalFeedForm,
	} = usePostEditor();

	const [title, setTitle] = useState('');

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const handleSubmit = async () => {
		await submitNormalFeedForm(title);
	};

	const handleCancel = () => {
		if (title || editorRef.current?.getHTML() !== '<p></p>') {
			const userConfirmed = window.confirm(USER_CONFIRM_MESSAGE);

			if (!userConfirmed) return;
		}

		navigate(PATH.FEED);
	};

	return (
		<S.NormalPostContainer>
			<S.PostInput
				placeholder='제목을 입력해주세요'
				value={title}
				onChange={handleTitleChange}
			/>
			<S.EditorContainer>
				<Editor editorRef={editorRef} appendImageFile={appendImageFile} />
			</S.EditorContainer>
			<FileUploadBox
				files={attachmentFiles}
				handleDragOver={handleDragOver}
				handleDrop={handleDrop}
				handleFilesAdd={appendAttachmentFile}
				handleFileDelete={deleteAttachmentFile}
			/>
			<S.ButtonContainer>
				<Button
					label='등록'
					size='md'
					variant='primary'
					onClick={handleSubmit}
				/>
				<Button
					label='취소'
					size='md'
					variant='secondary'
					onClick={handleCancel}
				/>
			</S.ButtonContainer>
		</S.NormalPostContainer>
	);
};

export default NormalPost;
