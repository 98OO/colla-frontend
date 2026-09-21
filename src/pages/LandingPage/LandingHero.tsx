import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import collaBear640 from '@assets/images/landing/colla-bear-640.webp';
import collaBear960 from '@assets/images/landing/colla-bear-960.webp';
import { ReactComponent as ChevronRightIcon } from '@assets/svg/chevron-right.svg';
import { Button } from '@components/common/Button/Button';
import { PATH } from '@constants/path';
import * as S from './LandingHero.styled';

const LandingHero = () => {
	const navigate = useNavigate();
	const [shouldShowMascot, setShouldShowMascot] = useState(
		() =>
			typeof window === 'undefined' ||
			typeof window.matchMedia !== 'function' ||
			!window.matchMedia('(max-width: 760px)').matches
	);

	useEffect(() => {
		if (typeof window.matchMedia !== 'function') return undefined;

		const mobileQuery = window.matchMedia('(max-width: 760px)');
		const syncMascotVisibility = () => setShouldShowMascot(!mobileQuery.matches);

		syncMascotVisibility();
		mobileQuery.addEventListener('change', syncMascotVisibility);

		return () => mobileQuery.removeEventListener('change', syncMascotVisibility);
	}, []);

	return (
		<S.HeroSection id='landing-hero' aria-labelledby='landing-hero-title'>
			<S.HeroInner>
				<S.HeroCopy>
					<S.HeroMessage>
						<S.HeroTitle id='landing-hero-title'>
							<span>팀플, 흩어지지 않게</span>
							<span>하나의 공간에서</span>
						</S.HeroTitle>
						<S.HeroDescription>
							<span>일정과 의견, 자료와 할 일을 한곳에 모아</span>
							<span>찾고 묻는 시간을 줄여 팀플에 더 집중할 수 있습니다.</span>
						</S.HeroDescription>
						<S.HeroActions>
							<Button
								label='Colla 시작하기'
								variant='primary'
								size='lg'
								onClick={() => navigate(PATH.SIGNUP)}
							/>
							<S.SecondaryAction href='#service-overview'>
								서비스 살펴보기
								<ChevronRightIcon aria-hidden='true' focusable='false' />
							</S.SecondaryAction>
						</S.HeroActions>
					</S.HeroMessage>
					{shouldShowMascot && (
						<S.MascotFigure>
							<S.MascotBackdrop aria-hidden='true' />
							<img
								src={collaBear640}
								srcSet={`${collaBear640} 640w, ${collaBear960} 960w`}
								sizes='(max-width: 960px) 400px, 500px'
								alt='노트북으로 팀 프로젝트를 진행하는 Colla 곰 마스코트'
								width='960'
								height='787'
								fetchPriority='high'
								decoding='async'
							/>
						</S.MascotFigure>
					)}
				</S.HeroCopy>
			</S.HeroInner>
		</S.HeroSection>
	);
};

export default LandingHero;
