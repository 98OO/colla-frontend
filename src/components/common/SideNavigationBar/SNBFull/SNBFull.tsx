import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@components/common/Button/Button';
import Divider from '@components/common/Divider/Divider';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import MenuItem from '@components/common/SideNavigationBar/MenuItem/MenuItem';
import { PATH } from '@constants/path';
import * as S from './SNBFull.styled';

const SNBFull = () => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<S.Container>
			<Button
				label='피드 작성'
				variant='primary'
				size='md'
				leadingIcon='Plus'
			/>
			<Flex direction='column' gap='48'>
				<Flex direction='column' gap='8'>
					<S.HeadingWrapper>
						<Heading size='xxs'>메뉴</Heading>
					</S.HeadingWrapper>
					<MenuItem
						leadingIcon='Home'
						title='피드'
						selected={location.pathname === PATH.FEED}
						onClick={() => navigate(PATH.FEED)}
					/>
					<MenuItem
						leadingIcon='Calendar'
						title='일정 및 할 일'
						selected={location.pathname === PATH.SCHEDULE}
						onClick={() => navigate(PATH.SCHEDULE)}
					/>
					<MenuItem
						leadingIcon='Message'
						title='채팅'
						selected={location.pathname === PATH.CHAT}
						number={20}
						onClick={() => navigate(PATH.CHAT)}
					/>
					<MenuItem
						leadingIcon='Folder'
						title='자료 저장소'
						selected={location.pathname === PATH.DOCUMENT}
						onClick={() => navigate(PATH.DOCUMENT)}
					/>
					<MenuItem
						leadingIcon='Mic'
						title='발표 준비'
						selected={location.pathname === PATH.PRESENTATION}
						onClick={() => navigate(PATH.PRESENTATION)}
					/>
				</Flex>
				<Flex direction='column' gap='8'>
					<Divider size='sm' />
					<S.ButtonWrapper>팀스페이스 설정</S.ButtonWrapper>
					<S.ButtonWrapper onClick={() => navigate(PATH.ENTRY)}>
						새 팀스페이스 생성
					</S.ButtonWrapper>
					<S.ButtonWrapper>도움말</S.ButtonWrapper>
				</Flex>
			</Flex>
		</S.Container>
	);
};

export default SNBFull;
