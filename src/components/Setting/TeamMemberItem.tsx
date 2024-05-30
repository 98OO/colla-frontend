import Flex from '@components/common/Flex/Flex';
import Profile from '@components/common/Profile/Profile';
import Select from '@components/common/Select/Select';
import Text from '@components/common/Text/Text';
import * as S from './TeamMemberItem.styled';

interface TeamMemberItemProps {
	profile: string | null;
	username: string;
	email: string;
	role: string;
	tag: string | null;
	tagOption: string[] | null;
	tagSelect: (index: number) => void;
}

const TeamMemberItem = (props: TeamMemberItemProps) => {
	const { profile, username, email, role, tag, tagOption, tagSelect } = props;

	return (
		<S.ProfileContainer>
			<Flex width='400' paddingRight='8' paddingLeft='8'>
				<Profile
					profile={profile}
					initial={username}
					avatarSize='lg'
					title={username}
					titleSize='lg'
					titleWeight='medium'
					text={email}
				/>
			</Flex>
			<Flex grow='1' paddingRight='8' paddingLeft='8' align='center'>
				<Text size='md' weight='medium'>
					{role}
				</Text>
			</Flex>
			<Flex grow='1' paddingRight='8' paddingLeft='8' align='center'>
				<Select
					size='sm'
					options={tagOption}
					select={tag}
					setSelect={tagSelect}
				/>
			</Flex>
		</S.ProfileContainer>
	);
};

export default TeamMemberItem;
