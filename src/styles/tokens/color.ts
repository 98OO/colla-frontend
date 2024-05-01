const primitiveColor = {
	BASE: { BLACK: '#000000', WHITE: '#ffffff' },
	BLUE: {
		50: '#e6f0ff',
		100: '#b0cfff',
		200: '#8ab8ff',
		300: '#5497ff',
		400: '#3383ff',
		500: '#0064ff',
		600: '#005be8',
		700: '#0047b5',
		800: '#00378c',
	},
	GRAY: {
		50: '#f9fafb',
		100: '#f3f4f6',
		200: '#e5e7eb',
		300: '#d1d5db',
		400: '#9ca3af',
		500: '#6b7280',
		600: '#4b5563',
		700: '#374151',
		800: '#1f2937',
	},
	GREEN: {
		50: '#f0fdf4',
		100: '#dcfce7',
		200: '#bbf7d0',
		300: '#86efac',
		400: '#4ade80',
		500: '#22c55e',
		600: '#16a34a',
		700: '#15803d',
		800: '#166534',
	},
	RED: {
		50: '#ffecec',
		100: '#ffc4c4',
		200: '#ffa8a8',
		300: '#ff8080',
		400: '#ff6868',
		500: '#ff4242',
		600: '#e83c3c',
		700: '#b52f2f',
		800: '#8c2424',
	},
	YELLOW: {
		50: '#fefce8',
		100: '#fef9c3',
		200: '#fef08a',
		300: '#fde047',
		400: '#facc15',
		500: '#eab308',
		600: '#ca8a04',
		700: '#a16207',
		800: '#854d0e',
	},
} as const;

const themeColor = {
	base: primitiveColor.BASE,
	information: primitiveColor.BLUE,
	brand: primitiveColor.BLUE,
	danger: primitiveColor.RED,
	neutral: primitiveColor.GRAY,
	success: primitiveColor.GREEN,
	warning: primitiveColor.YELLOW,
} as const;

export const color = {
	bg: {
		primary: themeColor.base.WHITE,
		secondary: themeColor.neutral[100],
		tertiary: themeColor.neutral[50],
		info: themeColor.information[400],
		infoSubtle: themeColor.information[200],
		warning: themeColor.warning[600],
		warningSubtle: themeColor.warning[100],
		success: themeColor.success[600],
		successSubtle: themeColor.success[100],
		danger: themeColor.danger[600],
		dangerSubtle: themeColor.danger[100],
		disabled: themeColor.neutral[100],
		iPrimary: themeColor.information[400],
		iPrimaryHover: themeColor.information[500],
		iSecondary: themeColor.neutral[100],
		iSecondaryHover: themeColor.neutral[50],
		iSelected: themeColor.brand[50],
		iSelectedHover: themeColor.brand[200],
		iDestructive: themeColor.danger[500],
		iDestructiveHover: themeColor.danger[600],
		iInverse: themeColor.base.WHITE,
		iInverseStrong: themeColor.base.BLACK,
	},
	border: {
		primary: themeColor.neutral[300],
		secondary: themeColor.neutral[400],
		tertiary: themeColor.neutral[200],
		focusRing: themeColor.information[400],
		info: themeColor.information[600],
		infoSubtle: themeColor.information[200],
		warning: themeColor.warning[600],
		warningSubtle: themeColor.warning[200],
		success: themeColor.success[600],
		successSubtle: themeColor.success[200],
		danger: themeColor.danger[600],
		dangerSubtle: themeColor.danger[200],
		disabled: themeColor.neutral[300],
		iPrimary: themeColor.information[400],
		iPrimaryHover: themeColor.information[700],
		iSecondary: themeColor.neutral[400],
		iSecondaryHover: themeColor.neutral[500],
	},
	icon: {
		primary: themeColor.neutral[700],
		secondary: themeColor.neutral[600],
		tertiary: themeColor.neutral[300],
		brand: themeColor.information[400],
		info: themeColor.information[600],
		warning: themeColor.warning[600],
		success: themeColor.success[600],
		danger: themeColor.danger[500],
		alarm: themeColor.danger[400],
		disabled: themeColor.neutral[300],
		iPrimary: themeColor.information[400],
		iPrimaryHover: themeColor.information[600],
		iPrimaryPress: themeColor.information[800],
		iSecondary: themeColor.neutral[600],
		iSecondaryHover: themeColor.neutral[700],
		iSecondaryPress: themeColor.neutral[800],
		iSelected: themeColor.information[600],
		iInverse: themeColor.base.WHITE,
	},
	text: {
		primary: themeColor.neutral[800],
		secondary: themeColor.neutral[600],
		tertiary: themeColor.neutral[500],
		info: themeColor.information[400],
		infoBold: themeColor.information[800],
		warning: themeColor.warning[600],
		warningBold: themeColor.warning[800],
		success: themeColor.success[600],
		successBold: themeColor.success[800],
		danger: themeColor.danger[500],
		dangerBold: themeColor.danger[800],
		disabled: themeColor.neutral[300],
		placeholder: themeColor.neutral[300],
		subtle: themeColor.neutral[300],
		iPrimary: themeColor.information[400],
		iPrimaryHover: themeColor.information[600],
		iSecondary: themeColor.neutral[600],
		iSecondaryHover: themeColor.neutral[700],
		iSelected: themeColor.information[400],
		iInverse: themeColor.base.WHITE,
	},
} as const;
