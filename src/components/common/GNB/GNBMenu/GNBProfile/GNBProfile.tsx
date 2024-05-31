import { useNavigate } from 'react-router-dom';
import Divider from '@components/common/Divider/Divider';
import Flex from '@components/common/Flex/Flex';
import Profile from '@components/common/Profile/Profile';
import MenuItem from '@components/common/SideNavigationBar/MenuItem/MenuItem';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import { ACCESS_TOKEN } from '@constants/api';
import { PATH } from '@constants/path';
import * as S from './GNBProfile.styled';

const GNBProfile = () => {
	const { userStatus } = useUserStatusQuery();
	const navigate = useNavigate();

	const handleLogOut = () => {
		localStorage.removeItem(ACCESS_TOKEN);
		navigate(PATH.SIGNIN);
	};

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
							leadingIcon='Home'
							title='마이페이지'
							selected={false}
							onClick={() => navigate(PATH.MYPAGE)}
						/>
						<MenuItem
							leadingIcon='Home'
							title='문의하기'
							selected={false}
							onClick={() => ''}
						/>
					</Flex>
					<Divider size='sm' padding={4} />
					<MenuItem
						leadingIcon='Home'
						title='로그아웃'
						selected={false}
						onClick={handleLogOut}
					/>
				</>
			)}
		</S.GNBProfileContainer>
	);
};

export default GNBProfile;
