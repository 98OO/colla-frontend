import Toast from '@components/common/Toast/Toast';
import useToastStore from '@stores/toastStore';
import * as S from './ToastContainer.styled';

const ToastContainer = () => {
	const { toastList } = useToastStore();

	return (
		<S.ToastContainerWrapper id='toast-container'>
			{toastList.map((toast) => (
				<Toast key={toast.id} {...toast} />
			))}
		</S.ToastContainerWrapper>
	);
};

export default ToastContainer;
