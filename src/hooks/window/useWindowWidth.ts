import { useState, useEffect } from 'react';

const useWindowWidth = () => {
	const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1024);

	const handleResize = () => {
		setIsMobileView(window.innerWidth <= 1024);
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return isMobileView;
};

export default useWindowWidth;
