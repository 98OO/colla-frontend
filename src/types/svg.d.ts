declare module '*.svg' {
	import type React from 'react';

	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
}
