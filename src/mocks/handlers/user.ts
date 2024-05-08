import { rest } from 'msw';

type FormData = {
	email: string;
	password: string;
};

export const userHandlers = [
	rest.post(`/auth/login`, (req, res, ctx) => {
		const { email, password } = req.body as FormData;
		if (email === 'test@test.com' && password === 'test') {
			return res(
				ctx.status(200),
				ctx.cookie('refreshToken', 'refreshtoken'),
				ctx.json({
					code: 20000,
					content: {
						accessToken: 'accessToken',
						userId: 1,
						hasTeam: false,
					},
					message: null,
				})
			);
		}
		return res(
			ctx.status(401),
			ctx.json({
				code: 40102,
				content: null,
				message: '이메일 또는 비밀번호가 일치하지 않습니다.',
			})
		);
	}),

	rest.post(`/auth/oauth/:provider/code`, (req, res, ctx) => {
		const code = req.body as string | null;
		if (code) {
			return res(
				ctx.status(200),
				ctx.cookie('refreshToken', 'refreshtoken'),
				ctx.json({
					code: 20000,
					content: {
						accessToken: 'accessToken',
						userId: 1,
						hasTeam: false,
					},
					message: null,
				})
			);
		}

		return res(
			ctx.status(404),
			ctx.json({
				code: 40105,
				content: null,
				message: '지원하지 않는 OAuth 공급자 입니다.',
			})
		);
	}),
];
