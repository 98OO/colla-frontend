import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@components/common/Icon/Icon';
import Text from '@components/common/Text/Text';
import useToastStore from '@stores/toastStore';
import * as S from './Toast.styled';

export interface ToastProps {
	id: number;
	variant?: 'Success' | 'Warning';
	duration?: number;
	message: string;
	isActive: boolean;
}

const Toast = (props: ToastProps) => {
	const { id, variant = 'Warning', message, isActive = true } = props;
	const { removeToast } = useToastStore();
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isActive || ref.current === null) return;

		ref.current.getAnimations().forEach((animation) => {
			// eslint-disable-next-line no-param-reassign
			animation.onfinish = () => removeToast(id);
		});
	}, [id, isActive, removeToast]);

	return createPortal(
		<S.ToastWrapper ref={ref} isActive={isActive}>
			<Icon name={variant} size='lg' />
			<S.ToastTextWrapper>
				<Text as='span' color='iInverse' size='lg' weight='medium'>
					{message}
				</Text>
			</S.ToastTextWrapper>
		</S.ToastWrapper>,
		document.getElementById('toast-container') as Element
	);
};

export default Toast;
