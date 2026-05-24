import { initialize, mswLoader } from 'msw-storybook-addon';
import type { Preview } from '@storybook/react-vite';
import { handlers } from '../src/mocks/handlers/index';
import { ThemeProvider } from 'styled-components';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import theme from './../src/styles/theme';
import GlobalStyle from '../src/styles/GlobalStyle';

initialize();

const preview: Preview = {
	tags: ['autodocs'],

	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		msw: {
			handlers: handlers,
		},
	},
	loaders: [mswLoader],

	decorators: [
		withThemeFromJSXProvider({
			themes: { default: theme },
			Provider: ThemeProvider,
			GlobalStyles: GlobalStyle,
		}),
	],
};

export default preview;
