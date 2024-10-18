import React from 'react';
import useMenu from '@hooks/common/useMenu';
import { renderHook } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { describe, test, expect } from 'vitest';
import theme from '@styles/theme';

describe('useMenu', () => {
	const TestMenuComponent = ({
		baseRef,
	}: {
		baseRef: React.RefObject<HTMLDivElement>;
	}) => {
		const { toggleMenu, showMenu } = useMenu();

		return (
			<div>
				<div ref={baseRef} data-testid='base-element'>
					Base Element
				</div>
				<button type='button' onClick={toggleMenu} data-testid='toggle-button'>
					Toggle Menu
				</button>
				{showMenu(baseRef, <div data-testid='menu'>Menu Content</div>, {
					top: 0,
					left: 0,
				})}
			</div>
		);
	};

	test('메뉴가 기본적으로 보이지 않아야 한다', () => {
		const baseRef = { current: document.createElement('div') };
		const { result } = renderHook(() => useMenu());

		const { showMenu } = result.current;

		render(showMenu(baseRef, <div>Test Menu</div>, { top: 0, left: 0 }));

		expect(screen.queryByText('Test Menu')).not.toBeInTheDocument();
	});

	test('토글 버튼을 누르면 메뉴가 보여야 한다', async () => {
		const baseRef = { current: document.createElement('div') };
		render(
			<ThemeProvider theme={theme}>
				<TestMenuComponent baseRef={baseRef} />
			</ThemeProvider>
		);

		const toggleButton = screen.getByTestId('toggle-button');
		expect(screen.queryByTestId('menu')).not.toBeInTheDocument();

		await userEvent.click(toggleButton);

		expect(screen.getByTestId('menu')).toBeInTheDocument();
	});

	test('외부를 클릭하면 메뉴가 닫혀야 한다', async () => {
		const baseRef = { current: document.createElement('div') };
		render(
			<ThemeProvider theme={theme}>
				<TestMenuComponent baseRef={baseRef} />
			</ThemeProvider>
		);

		const toggleButton = screen.getByTestId('toggle-button');

		await userEvent.click(toggleButton);

		expect(screen.getByTestId('menu')).toBeInTheDocument();

		await userEvent.click(document.body);

		expect(screen.queryByTestId('menu')).not.toBeInTheDocument();
	});
});
