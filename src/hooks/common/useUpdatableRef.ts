import { useRef } from 'react';

const useUpdatableRef = <T>(value: T) => {
	const ref = useRef(value);
	ref.current = value;
	return ref;
};

export default useUpdatableRef;
