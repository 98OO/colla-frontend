module.exports = {
	root: true,
	env: { browser: true, es2021: true },
	extends: [
		'airbnb',
		'airbnb/hooks',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:storybook/recommended',
		'plugin:prettier/recommended',
		'prettier',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh', '@typescript-eslint', 'import', 'prettier'],
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'react/react-in-jsx-scope': 'off',
		'react/jsx-filename-extension': [
			'error',
			{ extensions: ['.js', '.jsx', '.ts', '.tsx'] },
		],
		'import/order': [
			'error',
			{
				groups: [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
					'object',
					'type',
				],
				pathGroups: [
					{
						pattern: '{react*,react*/**}',
						group: 'builtin',
						position: 'before',
					},
					{
						pattern: '@mocks/*',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '@types/*',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '@styles/*',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '@components/*',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: '@pages/*',
						group: 'internal',
						position: 'after',
					},
				],
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
				pathGroupsExcludedImportTypes: [],
			},
		],
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],
		'import/no-unresolved': 'off',
		'import/prefer-default-export': 'off',
		'react/function-component-definition': 'off',
		'react/require-default-props': 'off',
		'react/jsx-props-no-spreading': 'off',
		'prettier/prettier': ['error', { endOfLine: 'auto' }],
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
};
