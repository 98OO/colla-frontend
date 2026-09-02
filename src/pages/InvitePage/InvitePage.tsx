import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as Colla } from '@assets/svg/colla.svg';
import { Button } from '@components/common/Button/Button';
import Flex from '@components/common/Flex/Flex';
import Heading from '@components/common/Heading/Heading';
import useParticipateTeamSpaceMutation from '@hooks/queries/useParticipateTeamSpaceMutation';
import useAuthStore from '@stores/authStore';
import { PATH } from '@constants/path';
import { INVITE_URL_KEY } from '@constants/storage';

const InvitePage = () => {
	const navigate = useNavigate();
	const { search } = useLocation();
	const [isCodeError, setIsCodeError] = useState(false);
	const { mutateParticipateTeamSpace } = useParticipateTeamSpaceMutation();
	const authStatus = useAuthStore((state) => state.status);

	const participateTeampSpace = async (inviteCode: string) => {
		try {
			await mutateParticipateTeamSpace(inviteCode);
		} catch (error) {
			setIsCodeError(true);
		}
	};

	useEffect(() => {
		if (authStatus === 'guest') {
			window.sessionStorage.setItem(INVITE_URL_KEY, search);
			navigate(PATH.SIGNIN);
		}
	}, [authStatus, search, navigate]);

	useEffect(() => {
		if (authStatus !== 'authenticated') return;

		const code = new URL(window.location.href).searchParams.get('code');
		if (code) {
			participateTeampSpace(code);
		}
	}, [authStatus]);

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
