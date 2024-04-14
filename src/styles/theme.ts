import { tokens } from './tokens';

const theme = {
	...tokens,
} as const;

export type Theme = typeof theme;

export default theme;
