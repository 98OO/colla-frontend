import { create } from 'zustand';
import type { ToastProps } from '@components/common/Toast/Toast';

interface ToastStore {
	toastList: ToastProps[];
	makeToast: (
		message: string,
		variant: ToastProps['variant'],
		duration?: number
	) => void;
	removeToast: (id: number) => void;
}

const TOAST_MAX_COUNT = 3;
const TOAST_DURATION = 3000;

const getUniqueId = () => {
	return Number(new Date());
};

const useToastStore = create<ToastStore>((set) => ({
	toastList: [],
	makeToast: (
		message: string,
		variant: ToastProps['variant'],
		duration = TOAST_DURATION
	) => {
		const id = getUniqueId();
		const newToast = { id, variant, message, isActive: true, duration };

		set((state) => {
			if (state.toastList.length >= TOAST_MAX_COUNT) {
				const newList = state.toastList.slice(1);
				return { toastList: [...newList, newToast] };
			}

			return { toastList: [...state.toastList, newToast] };
		});

		setTimeout(() => {
			set((state) => ({
				toastList: state.toastList.map((toast) =>
					toast.id === id ? { ...toast, isActive: false } : toast
				),
			}));
		}, duration);
	},
	removeToast: (id: number) => {
		set((state) => ({
			toastList: state.toastList.filter((toast) => toast.id !== id),
		}));
	},
}));

export default useToastStore;
