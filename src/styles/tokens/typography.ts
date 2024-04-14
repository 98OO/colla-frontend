const fontSize = {
	header: {
		xxl: '48px',
		xl: '40px',
		lg: '32px',
		md: '28px',
		sm: '24px',
		xs: '20px',
		xss: '18px',
	},
	body: {
		lg: '16px',
		md: '14px',
		sm: '12px',
	},
} as const;

const fontWeight = {
	regular: 400,
	medium: 500,
	semiBold: 600,
	bold: 700,
} as const;

export const typography = {
	fontSize,
	fontWeight,
} as const;
