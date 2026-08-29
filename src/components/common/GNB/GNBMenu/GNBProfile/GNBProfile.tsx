import { useNavigate } from 'react-router-dom';
import { signOut } from '@apis/auth/sessionActions';
import { ReactComponent as LogOutIcon } from '@assets/svg/log-out.svg';
import { ReactComponent as MailIcon } from '@assets/svg/mail.svg';
import { ReactComponent as ProfileIcon } from '@assets/svg/user.svg';
import Divider from '@components/common/Divider/Divider';
import Flex from '@components/common/Flex/Flex';
import Profile from '@components/common/Profile/Profile';
import MenuItem from '@components/common/SideNavigationBar/MenuItem/MenuItem';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import { PATH } from '@constants/path';
import * as S from './GNBProfile.styled';

const GNBProfile = () => {
	const { userStatus } = useUserStatusQuery();
	const navigate = useNavigate();

	return (
		<S.GNBProfileContainer>
			{userStatus && (
				<>
					<Flex paddingTop='2' paddingBottom='2'>
						<Profile
							profile={userStatus.profile.profileImageUrl}
							initial={userStatus.profile.username}
							avatarSize='lg'
							title={userStatus.profile.username}
							titleSize='lg'
							titleWeight='bold'
							text={userStatus.profile.email}
						/>
					</Flex>
					<Divider size='sm' padding={4} />
					<Flex direction='column' gap='4'>
						<MenuItem
							leadingIcon={ProfileIcon}
							title='마이페이지'
							selected={false}
							onClick={() => navigate(PATH.MYPAGE)}
						/>
						<MenuItem leadingIcon={MailIcon} title='문의하기' selected={false} onClick={() => ''} />
					</Flex>
					<Divider size='sm' padding={4} />
					<MenuItem leadingIcon={LogOutIcon} title='로그아웃' selected={false} onClick={signOut} />
				</>
			)}
		</S.GNBProfileContainer>
	);
};

export default GNBProfile;
