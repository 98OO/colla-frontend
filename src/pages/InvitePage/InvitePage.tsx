import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import useParticipateTeamSpaceMutation from '@hooks/queries/useParticipateTeamSpaceMutation';
import { ACCESS_TOKEN, INVITE_URL } from '@constants/api';
import { PATH } from '@constants/path';
import { Colla } from '@assets/svg';

const InvitePage = () => {
	const navigate = useNavigate();
	const { search } = useLocation();
	const [inviteCode, setInviteCode] = useState('');
	const [isCodeError, setIsCodeError] = useState(false);
	const { mutateParticipateTeamSpace } = useParticipateTeamSpaceMutation();

	const getAccessToken = () => {
		const accessToken = localStorage.getItem(ACCESS_TOKEN);
		if (!accessToken) {
			window.sessionStorage.setItem(INVITE_URL, search);
			navigate(PATH.SIGNIN);
		}
	};

	const participateTeampSpace = async () => {
		try {
			await mutateParticipateTeamSpace(inviteCode);
		} catch (error) {
			setIsCodeError(true);
		}
	};

	useEffect(() => {
		getAccessToken();
	}, []);

	useEffect(() => {
		const code = new URL(window.location.href).searchParams.get('code');
		if (code) {
			setInviteCode(code);
		}
	}, []);

	useEffect(() => {
		if (inviteCode) {
			participateTeampSpace();
		}
	}, [inviteCode]);

	return (
		<Flex>
			{isCodeError && (
				<Flex direction='column' gap='20' align='center'>
					<Colla />
					<Heading size='sm'>유효하지 않거나 만료된 초대 링크 입니다.</Heading>
					<Button
						label='팀 스페이스 생성 및 참가 페이지로 이동'
						variant='primary'
						size='lg'
						isFull
						onClick={() => navigate(PATH.ENTRY)}
					/>
				</Flex>
			)}
		</Flex>
	);
};

export default InvitePage;
