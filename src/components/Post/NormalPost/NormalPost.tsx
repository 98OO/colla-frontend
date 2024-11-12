import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/common/Button/Button';
import Editor from '@components/Post/Editor/Editor';
import { PATH } from '@constants/path';
import * as S from './NormalPost.styled';

const NormalPost = () => {
	const navigate = useNavigate();

	const [title, setTitle] = useState('');

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const handleSubmit = async () => {};

	const handleCancel = () => {
		navigate(PATH.FEED);
	};

	return (
		<S.NormalPostContainer>
			<S.PostInput
				placeholder='제목을 입력해주세요'
				value={title}
				onChange={handleTitleChange}
			/>
			<Editor />
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
