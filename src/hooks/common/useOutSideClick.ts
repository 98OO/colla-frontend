import { useCallback, useEffect, useRef } from 'react';

interface UseOutsideClickProps {
	onClickOutside: () => void;
	enabled?: boolean;
}

const useOutsideClick = ({ onClickOutside, enabled = true }: UseOutsideClickProps) => {
	const ref = useRef<HTMLDivElement | null>(null);

	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			const inside = ref.current?.contains(event.target as Node);
			if (ref.current && !inside) {
				onClickOutside();
			}
		},
		[onClickOutside]
	);

	useEffect(() => {
		if (!enabled) return undefined;

		document.addEventListener('mouseup', handleClickOutside);

		return () => {
			document.removeEventListener('mouseup', handleClickOutside);
		};
	}, [enabled, handleClickOutside]);

	return ref;
};

export default useOutsideClick;
