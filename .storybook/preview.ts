import { initialize, mswLoader } from 'msw-storybook-addon';
import type { Preview } from '@storybook/react';
import { handlers } from '../src/mocks/handlers/index';
import { ThemeProvider } from 'styled-components';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import theme from './../src/styles/theme';
import GlobalStyle from '../src/styles/GlobalStyle';

initialize();

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		msw: handlers,
	},
	loaders: mswLoader,
};

export const decorators = [
	withThemeFromJSXProvider({
		themes: { theme },
		Provider: ThemeProvider,
		GlobalStyles: GlobalStyle,
	}),
];

export default preview;
