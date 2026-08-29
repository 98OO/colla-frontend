import { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as DocumentIcon } from '@assets/svg/folder.svg';
import { ReactComponent as HelpIcon } from '@assets/svg/help-circle.svg';
import { ReactComponent as FeedIcon } from '@assets/svg/home.svg';
import { ReactComponent as ChatIcon } from '@assets/svg/message-circle.svg';
import { ReactComponent as CreateTeamIcon } from '@assets/svg/plus-square.svg';
import { ReactComponent as CreatePostIcon } from '@assets/svg/plus.svg';
import { ReactComponent as SettingsIcon } from '@assets/svg/settings.svg';
import { Button } from '@components/common/Button/Button';
import Divider from '@components/common/Divider/Divider';
import Flex from '@components/common/Flex/Flex';
import FeedMenu from '@components/common/SideNavigationBar/FeedMenu/FeedMenu';
import MenuItem from '@components/common/SideNavigationBar/MenuItem/MenuItem';
import useCurrentTeamRole from '@hooks/auth/useCurrentTeamRole';
import useMenu from '@hooks/common/useMenu';
import useUnreadMessageCountQuery from '@hooks/queries/teamspace/useUnreadMessageCountQuery';
import useSocketStore from '@stores/socketStore';
import { PATH } from '@constants/path';
import { SNB_ICON_WIDTH } from '@styles/layout';
import * as S from './SNBIcon.styled';

const SNBIcon = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { userStatus, currentTeamRole } = useCurrentTeamRole();
	const lastSeenTeamspaceId = userStatus?.profile.lastSeenTeamspaceId;

	const { unreadMessageCount } = useUnreadMessageCountQuery(lastSeenTeamspaceId);

	const { chatMessageCount } = useSocketStore();
	const baseRef = useRef<HTMLDivElement>(null);
	const { toggleMenu: handleFeedMenu, showMenu: showFeedMenu } = useMenu();

	return (
		<S.Container ref={baseRef}>
			<S.ButtonWrapper>
				<Button
					label=''
					variant='primary'
					size='md'
					leadingIcon={CreatePostIcon}
					onClick={handleFeedMenu}
				/>
			</S.ButtonWrapper>
			{showFeedMenu(baseRef, <FeedMenu closeMenu={handleFeedMenu} />, {
				top: 24,
				left: SNB_ICON_WIDTH + 26,
			})}
			<Flex direction='column' gap='48' paddingLeft='16' paddingRight='16'>
				<Flex direction='column' gap='8' align='center'>
					<MenuItem
						leadingIcon={FeedIcon}
						selected={location.pathname === PATH.FEED}
						type='iconOnly'
						onClick={() => navigate(PATH.FEED)}
					/>
					{/* <MenuItem
						leadingIcon='Calendar'
						selected={location.pathname === PATH.SCHEDULE}
						type='iconOnly'
						onClick={() => navigate(PATH.SCHEDULE)}
					/> */}
					<MenuItem
						leadingIcon={ChatIcon}
						selected={location.pathname === PATH.CHAT}
						number={chatMessageCount === null ? unreadMessageCount : chatMessageCount}
						type='iconOnly'
						onClick={() => navigate(PATH.CHAT)}
					/>
					<MenuItem
						leadingIcon={DocumentIcon}
						selected={location.pathname === PATH.DOCUMENT}
						type='iconOnly'
						onClick={() => navigate(PATH.DOCUMENT)}
					/>
					{/* <MenuItem
						leadingIcon='Mic'
						selected={location.pathname === PATH.PRESENTATION}
						type='iconOnly'
						onClick={() => navigate(PATH.PRESENTATION)}
					/> */}
				</Flex>
				<Flex direction='column' gap='8' align='center'>
					<Divider size='sm' />
					{currentTeamRole === 'LEADER' && (
						<MenuItem
							leadingIcon={SettingsIcon}
							selected={location.pathname === PATH.SETTING}
							type='iconOnly'
							onClick={() => navigate(PATH.SETTING)}
						/>
					)}
					<MenuItem
						leadingIcon={CreateTeamIcon}
						selected={false}
						type='iconOnly'
						onClick={() => navigate(PATH.ENTRY)}
					/>
					<MenuItem leadingIcon={HelpIcon} selected={false} type='iconOnly' onClick={() => ''} />
				</Flex>
			</Flex>
		</S.Container>
	);
};

export default SNBIcon;
