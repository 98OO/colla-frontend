import { useEffect, useRef, useState } from 'react';
import { ReactComponent as TeamSwitchIcon } from '@assets/svg/chevrons-updown.svg';
import { ReactComponent as InviteIcon } from '@assets/svg/user-plus.svg';
import Avatar from '@components/common/Avatar/Avatar';
import { Button } from '@components/common/Button/Button';
import GNBProfile from '@components/common/GNB/GNBMenu/GNBProfile/GNBProfile';
import GNBTeamInfo from '@components/common/GNB/GNBMenu/GNBTeamInfo/GNBTeamInfo';
import GNBTeamSpace from '@components/common/GNB/GNBMenu/GNBTeamSpace/GNBTeamSpace';
import Heading from '@components/common/Heading/Heading';
import Icon from '@components/common/Icon/Icon';
import Skeleton from '@components/common/Skeleton/Skeleton';
import useMenu from '@hooks/common/useMenu';
import useRecordTeamSpace from '@hooks/queries/teamspace/useRecordTeamSpace';
import useUserStatusQuery from '@hooks/queries/useUserStatusQuery';
import useSocketStore from '@stores/socketStore';
import { END_POINTS } from '@constants/api';
import { GNB_PROFILE_WIDTH, GNB_TEAM_INFO_WIDTH } from '@styles/layout';
import type { StompSubscription } from '@stomp/stompjs';
import * as S from './GNB.styled';

const GNB = () => {
	const { userStatus } = useUserStatusQuery();
	const lastSeenTeam = userStatus?.participatedTeamspaces.find(
		(team) => team.teamspaceId === userStatus?.profile.lastSeenTeamspaceId
	);
	const { mutateRecordTeamSpace } = useRecordTeamSpace();

	const { toggleMenu: handleTeamSpace, showMenu: showTeamSpace } = useMenu();
	const { toggleMenu: handleTeamInfo, showMenu: showTeamInfo } = useMenu();
	const { toggleMenu: handleProfile, showMenu: showProfile } = useMenu();
	const baseRef = useRef<HTMLDivElement>(null);
	const { stompClient, stompConnectionVersion, increaseChatMessageCount, setChatChannelList } =
		useSocketStore();
	const [position, setPosition] = useState(0);

	const chatChannelsSubscribeRef = useRef<{
		chatChannelListSubscribe: StompSubscription | null;
		chatMessageSubscribe: StompSubscription | null;
	}>({
		chatChannelListSubscribe: null,
		chatMessageSubscribe: null,
	});
	const latestConnectionVersionRef = useRef(stompConnectionVersion);

	latestConnectionVersionRef.current = stompConnectionVersion;

	useEffect(() => {
		const subscribedConnectionVersion = stompConnectionVersion;

		if (userStatus && stompClient) {
			const newChatChannelListSubscribe = stompClient.subscribe(
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

			const newChatMessageSubscribe = stompClient.subscribe(
				END_POINTS.RECEIVE_MESSAGE(userStatus.profile.lastSeenTeamspaceId),
				() => {
					stompClient.publish({
						destination: END_POINTS.SEND_CHAT_CHANNEL_LIST(
							userStatus.profile.lastSeenTeamspaceId,
							userStatus.profile.userId
						),
					});
				}
			);

			if (newChatChannelListSubscribe)
				chatChannelsSubscribeRef.current.chatChannelListSubscribe = newChatChannelListSubscribe;

			if (newChatMessageSubscribe)
				chatChannelsSubscribeRef.current.chatMessageSubscribe = newChatMessageSubscribe;

			if (stompConnectionVersion > 1) {
				stompClient.publish({
					destination: END_POINTS.SEND_CHAT_CHANNEL_LIST(
						userStatus.profile.lastSeenTeamspaceId,
						userStatus.profile.userId
					),
				});
			}
		}

		return () => {
			if (latestConnectionVersionRef.current === subscribedConnectionVersion) {
				chatChannelsSubscribeRef.current.chatChannelListSubscribe?.unsubscribe();
				chatChannelsSubscribeRef.current.chatMessageSubscribe?.unsubscribe();
			}

			chatChannelsSubscribeRef.current = {
				chatChannelListSubscribe: null,
				chatMessageSubscribe: null,
			};
		};
	}, [userStatus, stompClient, stompConnectionVersion]);

	useEffect(() => {
		if (userStatus?.profile.lastSeenTeamspaceId === null && userStatus)
			mutateRecordTeamSpace(userStatus.participatedTeamspaces[0].teamspaceId);
	}, [userStatus]);

	useEffect(() => {
		const baseElement = baseRef.current;
		if (!baseElement) return undefined;

		const observer = new ResizeObserver(([entry]) => {
			const width = entry.borderBoxSize[0]?.inlineSize ?? baseElement.offsetWidth;
			setPosition((currentPosition) => (currentPosition === width ? currentPosition : width));
		});

		observer.observe(baseElement, { box: 'border-box' });

		return () => observer.disconnect();
	}, []);

	return (
		<S.GNBContainer ref={baseRef}>
			{!userStatus ? (
				<>
					<S.LeftContainer>
						<Skeleton width={40} height={40} radius='8px' />
						<Skeleton width={100} height={20} radius='4px' />
					</S.LeftContainer>
					<S.RightContainer>
						<S.ProfileContainer>
							<Skeleton width={64} height={32} radius='8px' />
							<Skeleton width={36} height={36} radius='50%' />
						</S.ProfileContainer>
					</S.RightContainer>
				</>
			) : (
				lastSeenTeam && (
					<>
						<S.LeftContainer onClick={handleTeamSpace}>
							<Avatar
								profile={lastSeenTeam.profileImageUrl}
								initial={lastSeenTeam.name}
								size='mlg'
								shape='rect'
							/>
							<Heading size='sm'>{lastSeenTeam.name}</Heading>
							<Icon icon={TeamSwitchIcon} />
						</S.LeftContainer>
						{chatChannelsSubscribeRef &&
							showTeamSpace(baseRef, <GNBTeamSpace />, {
								top: 70,
								left: 10,
							})}
						<S.RightContainer>
							{/* <IconButton
							icon='Bell'
							ariaLabel='Bell'
							color='iSecondary'
							onClick={() => ''}
						/>
						<IconButton icon='Search' ariaLabel='Search' onClick={() => ''} /> */}
							<S.ProfileContainer>
								<Button
									label='초대'
									variant='secondary'
									size='sm'
									leadingIcon={InviteIcon}
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
				)
			)}
		</S.GNBContainer>
	);
};

export default GNB;
