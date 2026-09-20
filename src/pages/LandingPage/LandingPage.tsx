import { lazy, Suspense } from 'react';
import { useInView } from 'react-intersection-observer';
import LandingHero from '@pages/LandingPage/LandingHero';
import LandingNavigation from '@pages/LandingPage/LandingNavigation';
import LandingProblem from '@pages/LandingPage/LandingProblem';
import * as S from './LandingPage.styled';

const LandingFlow = lazy(() => import('@pages/LandingPage/LandingFlow'));

const DeferredLandingContent = () => {
	const { ref, inView } = useInView({
		rootMargin: '700px 0px',
		triggerOnce: true,
	});

	return (
		<S.DeferredContent ref={ref}>
			{inView && (
				<Suspense fallback={null}>
					<LandingFlow />
				</Suspense>
			)}
		</S.DeferredContent>
	);
};

const LandingPage = () => (
	<S.Container>
		<LandingNavigation />
		<LandingHero />
		<LandingProblem />
		<DeferredLandingContent />
	</S.Container>
);

export default LandingPage;
