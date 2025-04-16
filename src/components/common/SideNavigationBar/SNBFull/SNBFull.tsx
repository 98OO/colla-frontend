import { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@components/common/Button/Button';
import Divider from '@components/common/Divider/Divider';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import FeedMenu from '@components/common/SideNavigationBar/FeedMenu/FeedMenu';
import MenuItem from '@components/common/SideNavigationBar/MenuItem/MenuItem';
import Text from '@components/common/Text/Text';
import useMenu from '@hooks/common/useMenu';
import useUnreadMessageCountQuery from '@hooks/queries/teamspace/useUnreadMessageCountQuery';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import useSocketStore from '@stores/socketStore';
import { PATH } from '@constants/path';
import { SNB_FULL_WIDTH } from '@styles/layout';
import * as S from './SNBFull.styled';

const SNBFull = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { userStatus } = useUserStatusQuery();
	const lastSeenTeamspaceId = userStatus?.profile.lastSeenTeamspaceId;
	const teamspaces = userStatus?.participatedTeamspaces;
	const teamRole = teamspaces?.find(
		(teamspace) => teamspace.teamspaceId === lastSeenTeamspaceId
	)?.teamspaceRole;

	const { unreadMessageCount } =
		useUnreadMessageCountQuery(lastSeenTeamspaceId);
	const { chatMessageCount } = useSocketStore();
	const baseRef = useRef<HTMLDivElement>(null);
	const { toggleMenu: handleFeedMenu, showMenu: showFeedMenu } = useMenu();

	return (
		<S.Container ref={baseRef}>
			<Button
				label='피드 작성'
				variant='primary'
				size='md'
				leadingIcon='Plus'
				onClick={handleFeedMenu}
			/>
			{showFeedMenu(baseRef, <FeedMenu closeMenu={handleFeedMenu} />, {
				top: 24,
				left: SNB_FULL_WIDTH + 10,
			})}
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
					{/* <MenuItem
						leadingIcon='Calendar'
						title='일정 및 할 일'
						selected={location.pathname === PATH.SCHEDULE}
						onClick={() => navigate(PATH.SCHEDULE)}
					/> */}
					<MenuItem
						leadingIcon='Message'
						title='채팅'
						selected={location.pathname === PATH.CHAT}
						number={
							chatMessageCount === null ? unreadMessageCount : chatMessageCount
						}
						onClick={() => navigate(PATH.CHAT)}
					/>
					<MenuItem
						leadingIcon='Folder'
						title='자료 저장소'
						selected={location.pathname === PATH.DOCUMENT}
						onClick={() => navigate(PATH.DOCUMENT)}
					/>
					{/* <MenuItem
						leadingIcon='Mic'
						title='발표 준비'
						selected={location.pathname === PATH.PRESENTATION}
						onClick={() => navigate(PATH.PRESENTATION)}
					/> */}
				</Flex>
				<Flex direction='column' gap='8'>
					<Divider size='sm' />
					{teamRole === 'LEADER' && (
						<S.ButtonWrapper onClick={() => navigate(PATH.SETTING)}>
							<Text
								size='md'
								weight='medium'
								color={
									location.pathname === PATH.SETTING ? 'info' : 'tertiary'
								}>
								팀스페이스 설정
							</Text>
						</S.ButtonWrapper>
					)}
					<S.ButtonWrapper onClick={() => navigate(PATH.ENTRY)}>
						<Text size='md' weight='medium' color='tertiary'>
							새 팀스페이스 생성
						</Text>
					</S.ButtonWrapper>
					<S.ButtonWrapper>
						<Text size='md' weight='medium' color='tertiary'>
							도움말
						</Text>
					</S.ButtonWrapper>
				</Flex>
			</Flex>
		</S.Container>
	);
};

export default SNBFull;
