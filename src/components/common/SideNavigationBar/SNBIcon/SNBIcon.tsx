import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@components/common/Button/Button';
import Divider from '@components/common/Divider/Divider';
import Flex from '@components/common/Flex/Flex';
import MenuItem from '@components/common/SideNavigationBar/MenuItem/MenuItem';
import { PATH } from '@constants/path';
import * as S from './SNBIcon.styled';

const SNBIcon = () => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<S.Container>
			<S.ButtonWrapper>
				<Button label='' variant='primary' size='md' leadingIcon='Plus' />
			</S.ButtonWrapper>
			<Flex direction='column' gap='48' paddingLeft='16' paddingRight='16'>
				<Flex direction='column' gap='8' align='center'>
					<MenuItem
						leadingIcon='Home'
						selected={location.pathname === PATH.FEED}
						type='iconOnly'
						onClick={() => navigate(PATH.FEED)}
					/>
					<MenuItem
						leadingIcon='Calendar'
						selected={location.pathname === PATH.SCHEDULE}
						type='iconOnly'
						onClick={() => navigate(PATH.SCHEDULE)}
					/>
					<MenuItem
						leadingIcon='Message'
						selected={location.pathname === PATH.CHAT}
						number={20}
						type='iconOnly'
						onClick={() => navigate(PATH.CHAT)}
					/>
					<MenuItem
						leadingIcon='Folder'
						selected={location.pathname === PATH.DOCUMENT}
						type='iconOnly'
						onClick={() => navigate(PATH.DOCUMENT)}
					/>
					<MenuItem
						leadingIcon='Mic'
						selected={location.pathname === PATH.PRESENTATION}
						type='iconOnly'
						onClick={() => navigate(PATH.PRESENTATION)}
					/>
				</Flex>
				<Flex direction='column' gap='8' align='center'>
					<Divider size='sm' />
					<MenuItem
						leadingIcon='Settings'
						selected={location.pathname === PATH.SETTING}
						type='iconOnly'
						onClick={() => navigate(PATH.SETTING)}
					/>
					<MenuItem
						leadingIcon='PlusBox'
						selected={false}
						type='iconOnly'
						onClick={() => navigate(PATH.ENTRY)}
					/>
					<MenuItem
						leadingIcon='Help'
						selected={false}
						type='iconOnly'
						onClick={() => ''}
					/>
				</Flex>
			</Flex>
		</S.Container>
	);
};

export default SNBIcon;
