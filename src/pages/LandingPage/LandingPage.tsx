import { useNavigate } from 'react-router-dom';
import collaBearAvif340 from '@assets/images/collaBear-340.avif';
import collaBearWebp340 from '@assets/images/collaBear-340.webp';
import collaBearAvif577 from '@assets/images/collaBear-577.avif';
import collaBearWebp577 from '@assets/images/collaBear-577.webp';
import { ReactComponent as Colla } from '@assets/svg/colla.svg';
import { Button } from '@components/common/Button/Button';
import Text from '@components/common/Text/Text';
import { PATH } from '@constants/path';
import { collaBear } from '@assets/png';
import * as S from './LandingPage.styled';

const LandingPage = () => {
	const navigate = useNavigate();

	return (
		<S.Container>
			<S.ImageWrapper>
				<picture>
					<source
						type='image/avif'
						srcSet={`${collaBearAvif340} 340w, ${collaBearAvif577} 577w`}
						sizes='340px'
					/>
					<source
						type='image/webp'
						srcSet={`${collaBearWebp340} 340w, ${collaBearWebp577} 577w`}
						sizes='340px'
					/>
					<img
						alt='collaBear'
						src={collaBear}
						width={577}
						height={577}
						loading='eager'
						fetchPriority='high'
					/>
				</picture>
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
