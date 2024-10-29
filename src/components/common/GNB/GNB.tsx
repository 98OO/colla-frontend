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
import { END_POINTS } from '@constants/api';
import { GNB_PROFILE_WIDTH, GNB_TEAM_INFO_WIDTH } from '@styles/layout';
import * as S from './GNB.styled';

const GNB = () => {
	const { userStatus } = useUserStatusQuery();
	const lastSeenTeam = userStatus?.participatedTeamspaces.find(
		(team) => team.teamspaceId === userStatus?.profile.lastSeenTeamspaceId
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

	const chatChannelsSubscribeRef = useRef<{
		chatChannelListSubscribe: StompSubscription | null;
		chatMessageSubscribe: StompSubscription | null;
	}>({
		chatChannelListSubscribe: null,
		chatMessageSubscribe: null,
	});

	useEffect(() => {
		if (userStatus) {
			const newChatChannelListSubscribe = stompClient?.subscribe(
				END_POINTS.CHAT_CHANNEL_LIST(
					userStatus.profile.lastSeenTeamspaceId,
					userStatus.profile.userId
				),
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
			);

			const newChatMessageSubscribe = stompClient?.subscribe(
				END_POINTS.RECEIVE_MESSAGE(userStatus.profile.lastSeenTeamspaceId),
				() => {
					stompClient.send(
						END_POINTS.SEND_CHAT_CHANNEL_LIST(
							userStatus.profile.lastSeenTeamspaceId,
							userStatus.profile.userId
						)
					);
				}
			);

			if (newChatChannelListSubscribe)
				chatChannelsSubscribeRef.current.chatChannelListSubscribe =
					newChatChannelListSubscribe;

			if (newChatMessageSubscribe)
				chatChannelsSubscribeRef.current.chatMessageSubscribe =
					newChatMessageSubscribe;
		}

		setChatChannelList([]);

		return () => {
			if (chatChannelsSubscribeRef.current.chatChannelListSubscribe)
				chatChannelsSubscribeRef.current.chatChannelListSubscribe.unsubscribe();

			if (chatChannelsSubscribeRef.current.chatMessageSubscribe)
				chatChannelsSubscribeRef.current.chatMessageSubscribe.unsubscribe();

			chatChannelsSubscribeRef.current = {
				chatChannelListSubscribe: null,
				chatMessageSubscribe: null,
			};
		};
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
					{chatChannelsSubscribeRef &&
						showTeamSpace(baseRef, <GNBTeamSpace />, {
							top: 70,
							left: 10,
						})}
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
