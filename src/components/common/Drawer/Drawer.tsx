import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as ChevronsRightIcon } from '@assets/svg/chevrons-right.svg';
import IconButton from '@components/common/IconButton/IconButton';
import useOutsideClick from '@hooks/common/useOutSideClick';
import { AnimatePresence, domAnimation, LazyMotion, MotionConfig } from 'motion/react';
import { DRAWER_TRANSITION_DURATION_MS } from '@styles/motion';
import * as S from './Drawer.styled';

const DRAWER_VARIANTS = {
	hidden: { x: '100%', pointerEvents: 'none' },
	visible: { x: 0, pointerEvents: 'auto' },
} as const;

const DRAWER_TRANSITION = {
	duration: DRAWER_TRANSITION_DURATION_MS / 1000,
	ease: 'easeInOut',
} as const;

interface DrawerProps {
	isOpen: boolean;
	children: ReactNode;
	onClose: () => void;
}

const Drawer = ({ isOpen, onClose, children }: DrawerProps) => {
	const ref = useOutsideClick({
		onClickOutside: onClose,
		enabled: isOpen,
	});

	useEffect(() => {
		if (!isOpen) return undefined;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, onClose]);

	return createPortal(
		<LazyMotion features={domAnimation} strict>
			<MotionConfig reducedMotion='user'>
				<AnimatePresence initial={false}>
					{isOpen && (
						<S.DrawerContainer
							key='drawer'
							ref={ref}
							initial='hidden'
							animate='visible'
							exit='hidden'
							variants={DRAWER_VARIANTS}
							transition={DRAWER_TRANSITION}>
							<S.DrawerContent>
								<S.DrawerMenu>
									<IconButton
										icon={ChevronsRightIcon}
										size='lg'
										ariaLabel='close'
										onClick={onClose}
									/>
								</S.DrawerMenu>
								{children}
							</S.DrawerContent>
						</S.DrawerContainer>
					)}
				</AnimatePresence>
			</MotionConfig>
		</LazyMotion>,
		document.getElementById('drawer-root') as HTMLElement
	);
};

export default Drawer;
