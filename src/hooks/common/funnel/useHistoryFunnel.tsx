import { useCallback } from 'react';
import useFunnel from '@hooks/common/funnel/useFunnel';
import useHistory from '@hooks/common/useHistory';

const useHistoryFunnel = <T extends string>(steps: readonly [T, ...T[]]) => {
	const { Funnel, step, setStep, next } = useFunnel<T>(steps);
	const { push, back } = useHistory<T>(step, setStep);

	const goNext = useCallback(() => {
		const nextStep = steps[steps.indexOf(step) + 1];
		if (!nextStep) return;

		next();
		push(nextStep);
	}, [step, steps, next, push]);

	const goPrev = useCallback(() => {
		back();
	}, [back]);

	return { Funnel, step, goNext, goPrev };
};

export default useHistoryFunnel;
