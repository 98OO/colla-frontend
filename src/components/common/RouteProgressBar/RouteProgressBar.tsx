import { useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';
import * as S from './RouteProgressBar.styled';

const PROGRESS_DELAY_MS = 500;
const COMPLETE_TRANSITION_MS = 240;

type ProgressPhase = 'hidden' | 'loading' | 'complete';

const RouteProgressBar = () => {
	const navigation = useNavigation();
	const isNavigating = navigation.state !== 'idle';

	const [phase, setPhase] = useState<ProgressPhase>('hidden');

	useEffect(() => {
		if (!isNavigating) {
			setPhase((currentPhase) => (currentPhase === 'loading' ? 'complete' : 'hidden'));
			return undefined;
		}

		setPhase('hidden');

		const displayDelayTimer = window.setTimeout(() => {
			setPhase('loading');
		}, PROGRESS_DELAY_MS);

		return () => window.clearTimeout(displayDelayTimer);
	}, [isNavigating]);

	useEffect(() => {
		if (phase !== 'complete') return undefined;

		const hideTimer = window.setTimeout(() => {
			setPhase('hidden');
		}, COMPLETE_TRANSITION_MS);

		return () => window.clearTimeout(hideTimer);
	}, [phase]);

	if (phase === 'hidden') return null;

	return (
		<S.ProgressBar
			$isComplete={phase === 'complete'}
			role='progressbar'
			aria-label='페이지 이동 중'
		/>
	);
};

export default RouteProgressBar;
