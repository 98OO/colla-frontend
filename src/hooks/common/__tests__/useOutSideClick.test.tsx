import useOutsideClick from '@hooks/common/useOutSideClick';
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

const mockClick = vi.fn();

describe('useOutSideClick > ', () => {
	const TestComponent = ({
		onClickOutside,
	}: {
		onClickOutside: () => void;
	}) => {
		const ref = useOutsideClick({ onClickOutside });

		return (
			<div>
				<div data-testid='outside1'>메인 콘텐츠 바깥에 있는 친구 1</div>
				<main data-testid='main' ref={ref}>
					메인 콘텐츠
				</main>
				<div data-testid='outside2'>메인 콘텐츠 바깥에 있는 친구 2</div>
			</div>
		);
	};

	test('main을 클릭할 때는 onClickOutside가 호출되지 않는다', async () => {
		const { getByTestId } = render(
			<TestComponent onClickOutside={mockClick} />
		);

		const main = getByTestId('main');

		await userEvent.click(main);

		expect(mockClick).toHaveBeenCalledTimes(0);
	});

	test('외부 요소를 클릭했을 때 onClickOutside가 호출된다', async () => {
		const { getByTestId } = render(
			<TestComponent onClickOutside={mockClick} />
		);

		const outside1 = getByTestId('outside1');
		const outside2 = getByTestId('outside2');

		await userEvent.click(outside1);
		expect(mockClick).toHaveBeenCalledTimes(1);

		await userEvent.click(outside2);
		expect(mockClick).toHaveBeenCalledTimes(2);
	});

	test('rerender 후 새로운 핸들러가 호출된다', async () => {
		const { getByTestId, rerender } = render(
			<TestComponent onClickOutside={mockClick} />
		);

		const mockClick2 = vi.fn();
		rerender(<TestComponent onClickOutside={mockClick2} />);

		const outside1 = getByTestId('outside1');
		await userEvent.click(outside1);

		expect(mockClick).toHaveBeenCalledTimes(2); // 기존 핸들러는 더 이상 호출되지 않음
		expect(mockClick2).toHaveBeenCalledTimes(1); // 새로 등록된 핸들러 호출
	});
});
