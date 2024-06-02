import { ReactNode, RefObject, useState } from 'react';
import useOutsideClick from '@hooks/common/useOutSideClick';
import styled from 'styled-components';

interface MenuPosition {
	top?: number;
	bottom?: number;
	left?: number;
	right?: number;
}

const MenuContainer = styled.div<MenuPosition>`
	position: absolute;
	top: ${(props) => `${props.top}px` ?? 'auto'};
	bottom: ${(props) => `${props.bottom}px` ?? 'auto'};
	left: ${(props) => `${props.left}px` ?? 'auto'};
	right: ${(props) => `${props.right}px` ?? 'auto'};
	z-index: ${(props) => props.theme.elevation.zIndex.MENU};
`;

const useMenu = () => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleMenu = () => {
		setIsVisible((prev) => !prev);
	};

	const ref = useOutsideClick({
		onClickOutside: () => setIsVisible(false),
	});

	const showMenu = (
		baseRef: RefObject<HTMLElement>,
		menu: ReactNode,
		menuPosition: MenuPosition
	) => {
		const baseElement = baseRef.current;
		if (!baseElement) return null;

		const baseRect = baseElement.getBoundingClientRect();
		const { top, bottom, left, right } = baseRect;

		const position: MenuPosition = {
			top: (menuPosition.top ?? 0) + top,
			bottom: (menuPosition.bottom ?? 0) + bottom,
			left: (menuPosition.left ?? 0) + left,
			right: (menuPosition.right ?? 0) + right,
		};

		return (
			isVisible && (
				<MenuContainer ref={ref} {...position}>
					{menu}
				</MenuContainer>
			)
		);
	};

	return { toggleMenu, showMenu };
};

export default useMenu;
