import { useNavigate } from 'react-router-dom';
import { Button } from '@components/common/Button/Button';
import Text from '@components/common/Text/Text';
import { PATH } from '@constants/path';
import { collaBear } from '@assets/png';
import { Colla } from '@assets/svg';
import * as S from './LandingPage.styled';

const LandingPage = () => {
	const navigate = useNavigate();

	return (
		<S.Container>
			<S.ImageWrapper>
				<img alt='collaBear' src={collaBear} />
			</S.ImageWrapper>
			<S.CTAContainer>
				<Colla viewBox='0 0 154 57' />
				<Button
					label='시작하기'
					variant='primary'
					isFull
					size='lg'
					onClick={() => navigate(PATH.SIGNUP)}
				/>
				<S.CTATextWrapper>
					<Text size='md' weight='regular'>
						계정이 있나요?
					</Text>
					<Button
						label='로그인하기'
						variant='text'
						size='md'
						onClick={() => navigate(PATH.SIGNIN)}
					/>
				</S.CTATextWrapper>
			</S.CTAContainer>
		</S.Container>
	);
};

export default LandingPage;
