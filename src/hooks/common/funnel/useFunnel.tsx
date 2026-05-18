import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const createFunnel = <T extends string>() => {
	const StepContext = createContext<T | null>(null);

	const Funnel = ({ step, children }: { step: T; children: React.ReactNode }) => {
		return <StepContext.Provider value={step}>{children}</StepContext.Provider>;
	};

	Funnel.Step = function Step({ name, children }: { name: T; children: React.ReactNode }) {
		const curStep = useContext(StepContext);

		if (curStep === null) {
			throw new Error('<Funnel.Step>은 <Funnel> 내부에서 사용해주세요.');
		}

		return curStep === name ? children : null;
	};

	return Funnel;
};

const useFunnel = <T extends string>(steps: readonly [T, ...T[]]) => {
	const [step, setStep] = useState<T>(steps[0]);

	const stepIndexMap = useMemo(() => {
		const map = new Map<T, number>();
		steps.forEach((s, i) => map.set(s, i));

		return map;
	}, [steps]);

	const prev = useCallback(() => {
		setStep((curStep) => {
			const curIndex = stepIndexMap.get(curStep)!;

			return steps[curIndex - 1];
		});
	}, [steps, stepIndexMap]);

	const next = useCallback(() => {
		setStep((curStep) => {
			const curIndex = stepIndexMap.get(curStep)!;

			return steps[curIndex + 1];
		});
	}, [steps, stepIndexMap]);

	const Funnel = useMemo(() => createFunnel<T>(), []);

	return { Funnel, step, setStep, prev, next };
};

export default useFunnel;
