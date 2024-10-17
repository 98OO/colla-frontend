import { renderHook, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import useForm from '../useForm';

describe('useForm > ', () => {
	const onSubmitMock = vi.fn();
	const options = {
		onSubmit: onSubmitMock,
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	test('필드 값이 변경되면 formData가 업데이트되어야 한다', () => {
		const { result } = renderHook(() => useForm(options));

		// Register a field and simulate a change
		const field = result.current.register('name');
		act(() => {
			field.onChange({ target: { name: 'name', value: 'John' } });
		});

		// formData에 값이 잘 들어갔는지 확인
		expect(result.current.formData.name).toBe('John');
	});

	test('필드가 blur 될 때 validation이 동작해야 한다', () => {
		const { result } = renderHook(() =>
			useForm({
				...options,
				subscribe: [{ fieldName: 'name', value: 'John' }],
			})
		);

		// Register a field with required validation
		const field = result.current.register('name', {
			required: 'Name is required',
		});
		act(() => {
			field.onChange({ target: { name: 'name', value: '' } });
			field.onBlur({ target: { name: 'name' } });
		});

		// 에러가 발생하는지 확인
		expect(result.current.errors.name.isError).toBe(true);
		expect(result.current.errors.name.message).toBe('Name is required');
	});

	test('handleSubmit이 validation을 통과하면 onSubmit이 호출되어야 한다', async () => {
		const { result } = renderHook(() =>
			useForm({
				...options,
				subscribe: [{ fieldName: 'name', value: 'John' }],
			})
		);

		// Register a field with required validation
		const field = result.current.register('name', {
			required: 'Name is required',
		});
		act(() => {
			field.onChange({ target: { name: 'name', value: 'John' } });
		});

		// handleSubmit을 호출해서 검증
		await act(async () => {
			result.current.handleSubmit({ preventDefault: vi.fn() });
		});

		expect(onSubmitMock).toHaveBeenCalled();
	});

	test('필드가 invalid한 경우 onSubmit이 호출되지 않아야 한다', async () => {
		const { result } = renderHook(() =>
			useForm({
				...options,
				subscribe: [{ fieldName: 'name', value: 'John' }],
			})
		);

		// 필드 등록 및 빈 값으로 설정
		const field = result.current.register('name', {
			required: 'Name is required',
		});
		act(() => {
			field.onChange({ target: { name: 'name', value: '' } });
			field.onBlur({ target: { name: 'name' } });
		});

		// handleSubmit 호출
		act(() => {
			result.current.handleSubmit({ preventDefault: vi.fn() });
		});

		// onSubmit이 호출되지 않음을 확인
		expect(onSubmitMock).not.toHaveBeenCalled();
		expect(result.current.errors.name.isError).toBe(true);
		expect(result.current.errors.name.message).toBe('Name is required');
	});
});
