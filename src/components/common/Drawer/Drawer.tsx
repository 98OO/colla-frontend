import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import IconButton from '@components/common/IconButton/IconButton';
import useOutsideClick from '@hooks/common/useOutSideClick';
import * as S from './Drawer.styled';

interface DrawerProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const Drawer = ({ isOpen, onClose, children }: DrawerProps) => {
	const ref = useOutsideClick({
		onClickOutside: onClose,
	});

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Escape' && isOpen) {
				onClose();
			}
		},
		[isOpen, onClose]
	);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [handleKeyDown]);

	useEffect(() => {
		if (isOpen && ref.current) {
			ref.current.classList.add('open');
		} else if (ref.current) {
			ref.current.classList.remove('open');
		}
	}, [isOpen]);

	return createPortal(
		<S.DrawerContainer ref={ref}>
			<S.DrawerContent>
				<S.DrawerMenu>
					<IconButton
						icon='ChevronsRight'
						size='lg'
						ariaLabel='close'
						onClick={onClose}
					/>
				</S.DrawerMenu>
				{children}
			</S.DrawerContent>
		</S.DrawerContainer>,
		document.getElementById('drawer-root') as HTMLElement
	);
};

export default Drawer;
