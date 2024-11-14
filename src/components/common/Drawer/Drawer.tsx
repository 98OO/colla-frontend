import { useEffect } from 'react';
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

	useEffect(() => {
		if (isOpen && ref.current) {
			ref.current.classList.add('open');
		} else if (ref.current) {
			ref.current.classList.remove('open');
		}
	}, [isOpen]);

	return createPortal(
		<S.DrawerContainer ref={ref} isOpen={isOpen}>
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
