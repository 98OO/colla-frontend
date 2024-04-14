const shadow = {
	shadow2: '0px 1px 2px rgba(0, 0, 0, 0.16), 0px 0px 1px rgba(0, 0, 0, 0.12)',
	shadow4: '0px 2px 4px rgba(0, 0, 0, 0.16), 0px 0px 2px rgba(0, 0, 0, 0.12)',
	shadow8: '0px 4px 8px rgba(0, 0, 0, 0.16), 0px 0px 4px rgba(0, 0, 0, 0.12)',
	shadow16: '0px 8px 16px rgba(0, 0, 0, 0.16), 0px 0px 8px rgba(0, 0, 0, 0.12)',
} as const;

const zIndex = {
	MENU: 2,
	MODAL: 3,
	DIALOG: 4,
} as const;

export const elevation = {
	shadow,
	zIndex,
} as const;
