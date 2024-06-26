import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	staticDirs: ['../public', '../src/assets'],
	addons: [
		'@storybook/addon-onboarding',
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@chromatic-com/storybook',
		'@storybook/addon-interactions',
		'@storybook/addon-themes',
	],
	docs: {
		autodocs: 'tag',
	},
	core: {},
	typescript: {
		reactDocgen: 'react-docgen-typescript',
	},
};
export default config;
