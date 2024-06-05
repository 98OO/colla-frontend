import { useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import * as S from './Modal.styled';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [onClose]);

	const modalRoot = document.getElementById('modal-root');

	if (!isOpen || !modalRoot) return null;

	return createPortal(
		<S.Backdrop onClick={onClose}>
			<S.ModalWrapper>{children}</S.ModalWrapper>
		</S.Backdrop>,
		modalRoot
	);
};

export default Modal;
