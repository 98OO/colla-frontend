import { useInView, type IntersectionOptions } from 'react-intersection-observer';

interface UseIntersectionObserverProps
	extends Pick<IntersectionOptions, 'root' | 'rootMargin' | 'threshold'> {
	enabled?: boolean;
}

const useIntersectionObserver = ({
	root = null,
	rootMargin = '0px',
	threshold = 0,
	enabled = true,
}: UseIntersectionObserverProps = {}) => {
	const { ref, inView } = useInView({
		root,
		rootMargin,
		threshold,
		skip: !enabled,
	});

	return {
		targetRef: ref,
		isIntersecting: enabled && inView,
	};
};

export default useIntersectionObserver;
