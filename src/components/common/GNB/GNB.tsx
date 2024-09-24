import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Avatar from '@components/common/Avatar/Avatar';
import { Button } from '@components/common/Button/Button';
import GNBProfile from '@components/common/GNB/GNBMenu/GNBProfile/GNBProfile';
import GNBTeamInfo from '@components/common/GNB/GNBMenu/GNBTeamInfo/GNBTeamInfo';
import GNBTeamSpace from '@components/common/GNB/GNBMenu/GNBTeamSpace/GNBTeamSpace';
import Heading from '@components/common/Heading/Heading';
import Icon from '@components/common/Icon/Icon';
import IconButton from '@components/common/IconButton/IconButton';
import useMenu from '@hooks/common/useMenu';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import { StompSubscription } from '@stomp/stompjs';
import useSocketStore from '@stores/socketStore';
import { GNB_PROFILE_WIDTH, GNB_TEAM_INFO_WIDTH } from '@styles/layout';
import * as S from './GNB.styled';

const GNB = () => {
	const { userStatus } = useUserStatusQuery();
	const lastSeenTeamspaceId = userStatus?.profile.lastSeenTeamspaceId;
	const lastSeenTeam = userStatus?.participatedTeamspaces.find(
		(team) => team.teamspaceId === lastSeenTeamspaceId
	);

	const { toggleMenu: handleTeamSpace, showMenu: showTeamSpace } = useMenu();
	const { toggleMenu: handleTeamInfo, showMenu: showTeamInfo } = useMenu();
	const { toggleMenu: handleProfile, showMenu: showProfile } = useMenu();
	const baseRef = useRef<HTMLDivElement>(null);
	const { stompClient, increaseChatMessageCount, setChatChannelList } =
		useSocketStore();
	const [position, setPosition] = useState(0);

	const updatePosition = () => {
		if (baseRef.current) {
			setPosition(baseRef.current.offsetWidth);
		}
	};

	const [chatChannelsStatus, setChatChannelsStatus] = useState<{
		chatChannelListStatus?: StompSubscription;
		chatMessageStatus?: StompSubscription;
	}>({});

	useEffect(() => {
		if (userStatus) {
			setChatChannelsStatus((prevState) => ({
				...prevState,
				chatChannelListStatus: stompClient?.subscribe(
					`/topic/teamspaces/${lastSeenTeamspaceId}/users/${userStatus.profile.userId}/chat-channels/status`,
					(message) => {
						const { chatChannelsResponse } = JSON.parse(message.body);
						const totalUnreadMessageCount = chatChannelsResponse.reduce(
							(sum: number, channel: { unreadMessageCount: number }) =>
								sum + channel.unreadMessageCount,
							0
						);
						increaseChatMessageCount(totalUnreadMessageCount);
						setChatChannelList(chatChannelsResponse);
					}
				),
			}));

			setChatChannelsStatus((prevState) => ({
				...prevState,
				chatMessageStatus: stompClient?.subscribe(
					`/topic/teamspaces/${lastSeenTeamspaceId}/receive-message`,
					() => {
						stompClient.send(
							`/app/teamspaces/${lastSeenTeamspaceId}/users/${userStatus.profile.userId}/chat-channels/status`
						);
					}
				),
			}));
		}
	}, [userStatus, stompClient]);

	useLayoutEffect(() => {
		updatePosition();
		window.addEventListener('resize', updatePosition);
		return () => {
			window.removeEventListener('resize', updatePosition);
		};
	}, [baseRef.current?.offsetWidth]);

	return (
		<S.GNBContainer ref={baseRef}>
			{userStatus && lastSeenTeam && (
				<>
					<S.LeftContainer onClick={handleTeamSpace}>
						<Avatar
							profile={lastSeenTeam.profileImageUrl}
							initial={lastSeenTeam.name}
							size='lg'
							shape='rect'
						/>
						<Heading size='md'>{lastSeenTeam.name}</Heading>
						<Icon name='Updown' />
					</S.LeftContainer>
					{chatChannelsStatus &&
						showTeamSpace(
							baseRef,
							<GNBTeamSpace chatChannelsStatus={chatChannelsStatus} />,
							{
								top: 70,
								left: 10,
							}
						)}
					<S.RightContainer>
						<IconButton
							icon='Bell'
							ariaLabel='Bell'
							color='iSecondary'
							onClick={() => ''}
						/>
						<IconButton icon='Search' ariaLabel='Search' onClick={() => ''} />
						<S.ProfileContainer>
							<Button
								label='초대'
								variant='secondary'
								size='sm'
								leadingIcon='User'
								onClick={handleTeamInfo}
							/>
							{showTeamInfo(baseRef, <GNBTeamInfo />, {
								top: 70,
								left: position - GNB_TEAM_INFO_WIDTH - 10,
							})}
							<Avatar
								profile={userStatus.profile.profileImageUrl}
								initial={userStatus.profile.username}
								size='md'
								shape='circle'
								onClick={handleProfile}
							/>
							{showProfile(baseRef, <GNBProfile />, {
								top: 70,
								left: position - GNB_PROFILE_WIDTH - 10,
							})}
						</S.ProfileContainer>
					</S.RightContainer>
				</>
			)}
		</S.GNBContainer>
	);
};

export default GNB;
