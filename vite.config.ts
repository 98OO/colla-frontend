import svgr from '@svgr/rollup';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig as defineTestConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
	defineConfig({
		plugins: [react(), svgr(), tsconfigPaths()],
		server: {
			port: 3000,
		},
	}),
	defineTestConfig({
		test: {
			globals: true,
			environment: 'jsdom',
		},
	})
);
