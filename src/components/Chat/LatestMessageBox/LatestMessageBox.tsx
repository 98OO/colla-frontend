import Profile from '@components/common/Profile/Profile';
import type { Message } from '@type/chat';
import * as S from './LatestMessageBox.styled';

interface LatestMessageBoxProps {
	latestMessage: Message;
	onClick: React.MouseEventHandler<HTMLDivElement>;
}

const LatestMessageBox = (props: LatestMessageBoxProps) => {
	const { latestMessage, onClick } = props;

	return (
		<S.LatestMessageContainer onClick={onClick}>
			<Profile
				profile={latestMessage.author.profileImageUrl}
				initial={latestMessage.author.username}
				avatarSize='sm'
				title={latestMessage.author.username}
				subTitle={latestMessage.content}
				trailingIcon='Down'
			/>
		</S.LatestMessageContainer>
	);
};

export default LatestMessageBox;
