import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as SuccessIcon } from '@assets/svg/check-circle.svg';
import { ReactComponent as WarningIcon } from '@assets/svg/warning-circle.svg';
import Icon from '@components/common/Icon/Icon';
import Text from '@components/common/Text/Text';
import useToastStore from '@stores/toastStore';
import type { IconComponent } from '@type/icon';
import * as S from './Toast.styled';

type ToastVariant = 'Success' | 'Warning';

export interface ToastProps {
	id: number;
	variant?: ToastVariant;
	duration?: number;
	message: string;
	isActive: boolean;
}

const TOAST_ICON_MAP: Record<ToastVariant, IconComponent> = {
	Success: SuccessIcon,
	Warning: WarningIcon,
};

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
		<S.ToastWrapper ref={ref} $isActive={isActive}>
			<Icon icon={TOAST_ICON_MAP[variant]} size='lg' />
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
