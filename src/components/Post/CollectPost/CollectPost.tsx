import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ClockIcon } from '@assets/svg/clock.svg';
import { Button } from '@components/common/Button/Button';
import FileUploadBox from '@components/common/FileUploadBox/FileUploadBox';
import Flex from '@components/common/Flex/Flex';
import Icon from '@components/common/Icon/Icon';
import Text from '@components/common/Text/Text';
import DatePicker from '@components/Post/DatePicker/DatePicker';
import Editor from '@components/Post/Editor/Editor';
import usePostEditor from '@hooks/post/usePostEditor';
import getDefaultDueAt from '@utils/post/scheduling/getDefaultDueAt';
import isPastTime from '@utils/post/scheduling/isPastTime';
import useToastStore from '@stores/toastStore';
import { PATH } from '@constants/path';
import { DUE_AT_PAST_MESSAGE, USER_CONFIRM_MESSAGE } from '@constants/post';
import type { DateString, TimeString } from '@type/post';
import * as S from './CollectPost.styled';

const CollectPost = () => {
	const navigate = useNavigate();
	const { makeToast } = useToastStore();
	const {
		editorRef,
		attachmentFiles,
		isSubmitting,
		appendImageFile,
		appendAttachmentFile,
		deleteAttachmentFile,
		handleDrop,
		handleDragOver,
		submitCollectFeed,
	} = usePostEditor();

	const { dueAtDate, dueAtTime } = getDefaultDueAt();

	const [title, setTitle] = useState('');
	const [time, setTime] = useState<TimeString>(dueAtTime);
	const [selectedDate, setSelectedDate] = useState<DateString>(dueAtDate);

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const handleSubmit = async () => {
		if (isPastTime(selectedDate, time)) {
			makeToast(DUE_AT_PAST_MESSAGE, 'Warning');
			return;
		}

		await submitCollectFeed(title, `${selectedDate} ${time}`);
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
				<S.PostInput placeholder='제목을 입력해주세요' value={title} onChange={handleTitleChange} />
				<Flex align='center' gap='14' position='relative'>
					<Icon icon={ClockIcon} />
					<Text size='md' weight='regular'>
						마감 일시
					</Text>
					<DatePicker
						selectedDate={selectedDate}
						time={time}
						onDateChange={setSelectedDate}
						onTimeChange={setTime}
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
					disabled={isSubmitting}
				/>
				<Button label='취소' size='md' variant='secondary' onClick={handleCancel} />
			</S.ButtonContainer>
		</S.CollectPostContainer>
	);
};

export default CollectPost;
