import IconButton from '@components/common/IconButton/IconButton';
import * as S from './ChatMessageActions.styled';

interface ChatMessageActionsProps {
	onRetry: () => void;
	onDelete: () => void;
}

const ChatMessageActions = (props: ChatMessageActionsProps) => {
	const { onRetry, onDelete } = props;

	return (
		<S.Container>
			<IconButton
				icon='Refresh'
				ariaLabel='메시지 재전송'
				color='primary'
				size='sm'
				onClick={onRetry}
			/>
			<IconButton
				icon='X'
				ariaLabel='실패 메시지 삭제'
				color='danger'
				size='sm'
				onClick={onDelete}
			/>
		</S.Container>
	);
};

export default ChatMessageActions;
