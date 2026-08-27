import { useEffect, useRef, useState } from 'react';

interface UseSchedulingEditModeOptions {
	feedId: number;
	onEditChange?: (feedId: number, isEditing: boolean) => void;
}

const useSchedulingEditMode = ({ feedId, onEditChange }: UseSchedulingEditModeOptions) => {
	const [isEditing, setIsEditing] = useState(false);
	const isEditingRef = useRef(false);

	const enterEditMode = () => {
		isEditingRef.current = true;
		setIsEditing(true);
		onEditChange?.(feedId, true);
	};

	const exitEditMode = () => {
		isEditingRef.current = false;
		setIsEditing(false);
		onEditChange?.(feedId, false);
	};

	useEffect(() => {
		return () => {
			if (isEditingRef.current) onEditChange?.(feedId, false);
		};
	}, [feedId, onEditChange]);

	return { isEditing, enterEditMode, exitEditMode };
};

export default useSchedulingEditMode;
