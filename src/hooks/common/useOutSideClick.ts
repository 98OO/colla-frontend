import { useCallback, useEffect, useRef } from 'react';

interface UseOutsideClickProps {
	onClickOutside: () => void;
}

const useOutsideClick = ({ onClickOutside }: UseOutsideClickProps) => {
	const ref = useRef<HTMLDivElement | null>(null);

	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			const inside = ref.current?.contains(event.target as Node);
			if (ref.current && !inside) {
				onClickOutside();
			}
		},
		[onClickOutside, ref]
	);

	useEffect(() => {
		document.addEventListener('mouseup', handleClickOutside);

		return () => {
			document.removeEventListener('mouseup', handleClickOutside);
		};
	}, [handleClickOutside]);

	return ref;
};

export default useOutsideClick;
