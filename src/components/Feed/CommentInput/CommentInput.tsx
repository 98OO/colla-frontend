import { ChangeEvent, useRef, useState } from 'react';
import { Button } from '@components/common/Button/Button';
import Input from '@components/common/Input/Input';
import useLeaveCommentMutation from '@hooks/queries/post/useLeaveCommentMutation';
import * as S from './CommentInput.styled';

interface CommentInputProps {
	teamspaceId: number;
	feedId: number;
}

const CommentInput = (props: CommentInputProps) => {
	const { teamspaceId, feedId } = props;
	const [comment, setComment] = useState('');
	const commentRef = useRef<HTMLDivElement>(null);
	const { mutateLeaveComment } = useLeaveCommentMutation();

	const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setComment(value);
	};

	const handleLeaveComment = async () => {
		if (comment.trim().length > 0) {
			await mutateLeaveComment(teamspaceId, feedId, comment);

			setComment('');
			setTimeout(() => {
				commentRef.current?.scrollIntoView({ behavior: 'smooth' });
			}, 300);
		}
	};

	return (
		<S.CommentInputContainer ref={commentRef}>
			<Input
				size='sm'
				border='underLine'
				isError={false}
				placeholder='댓글 달기...'
				value={comment}
				onChange={handleCommentChange}
			/>
			<Button
				label='등록'
				variant='primary'
				size='sm'
				disabled={!comment.trim().length}
				onClick={handleLeaveComment}
			/>
		</S.CommentInputContainer>
	);
};

export default CommentInput;