import { ReactComponent as ProgressActivityIcon } from '@assets/svg/ProgressActivity.svg';
import { ReactComponent as RefreshIcon } from '@assets/svg/Refresh.svg';
import { ReactComponent as CloseIcon } from '@assets/svg/x.svg';
import Icon from '@components/common/Icon/Icon';
import IconButton from '@components/common/IconButton/IconButton';
import * as S from './ChatMessageActions.styled';

interface ChatMessageActionsProps {
	onRetry?: () => void;
	onDelete?: () => void;
	isRetrying?: boolean;
}

const ChatMessageActions = (props: ChatMessageActionsProps) => {
	const { onRetry, onDelete, isRetrying = false } = props;

	if (isRetrying || !onRetry || !onDelete) {
		return (
			<S.PendingIndicator aria-label='메시지 전송 중' role='status'>
				<Icon icon={ProgressActivityIcon} color='secondary' size='sm' />
			</S.PendingIndicator>
		);
	}

	return (
		<S.Container>
			<IconButton
				icon={RefreshIcon}
				ariaLabel='메시지 재전송'
				color='primary'
				size='sm'
				onClick={onRetry}
			/>
			<IconButton
				icon={CloseIcon}
				ariaLabel='실패 메시지 삭제'
				color='danger'
				size='sm'
				onClick={onDelete}
			/>
		</S.Container>
	);
};

export default ChatMessageActions;
