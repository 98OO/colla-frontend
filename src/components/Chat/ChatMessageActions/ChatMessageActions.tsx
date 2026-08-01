import Icon from '@components/common/Icon/Icon';
import IconButton from '@components/common/IconButton/IconButton';
import * as S from './ChatMessageActions.styled';

interface ChatMessageActionsProps {
	onRetry?: () => void;
	onDelete?: () => void;
}

const ChatMessageActions = (props: ChatMessageActionsProps) => {
	const { onRetry, onDelete } = props;

	if (!onRetry || !onDelete) {
		return (
			<S.PendingIndicator aria-label='메시지 전송 중' role='status'>
				<Icon name='ProgressActivity' color='secondary' size='sm' />
			</S.PendingIndicator>
		);
	}

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
