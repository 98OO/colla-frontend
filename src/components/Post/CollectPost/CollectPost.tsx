import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/common/Button/Button';
import FileUploadBox from '@components/common/FileUploadBox/FileUploadBox';
import Flex from '@components/common/Flex/Flex';
import Icon from '@components/common/Icon/Icon';
import Text from '@components/common/Text/Text';
import DatePicker from '@components/Post/DatePicker/DatePicker';
import Editor from '@components/Post/Editor/Editor';
import useCalendar from '@hooks/post/useCalendar';
import useDaySelection from '@hooks/post/useDaySelection';
import usePostEditor from '@hooks/post/usePostEditor';
import { PATH } from '@constants/path';
import { USER_CONFIRM_MESSAGE } from '@constants/post';
import * as S from './CollectPost.styled';

const CollectPost = () => {
	const navigate = useNavigate();
	const {
		editorRef,
		attachmentFiles,
		appendImageFile,
		appendAttachmentFile,
		deleteAttachmentFile,
		handleDrop,
		handleDragOver,
		handleSubmit: submitCollectFeedForm,
	} = usePostEditor();
	const [title, setTitle] = useState('');
	const { getInitialDueAt, getFormattedDay } = useCalendar();
	const initalDueAt = getInitialDueAt('');
	const { selectedDays, isDaySelected, toggleDaySelection } = useDaySelection(
		initalDueAt,
		'single'
	);

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const handleSubmit = async () => {
		await submitCollectFeedForm(title, getFormattedDay(selectedDays[0], true));
	};

	const handleCancel = () => {
		if (title || editorRef.current?.getHTML() !== '<p></p>') {
			const userConfirmed = window.confirm(USER_CONFIRM_MESSAGE);

			if (!userConfirmed) return;
		}

		navigate(PATH.FEED);
	};

	return (
		<S.CollectPostContainer>
			<Flex direction='column' gap='12'>
				<S.PostInput
					placeholder='제목을 입력해주세요'
					value={title}
					onChange={handleTitleChange}
				/>
				<Flex align='center' gap='14' position='relative'>
					<Icon name='Clock' />
					<Text size='md' weight='regular'>
						마감 일시
					</Text>
					<DatePicker
						selectedDays={selectedDays}
						isDaySelected={isDaySelected}
						toggleDaySelection={toggleDaySelection}
					/>
				</Flex>
			</Flex>
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
		</S.CollectPostContainer>
	);
};

export default CollectPost;
