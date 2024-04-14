import { users } from '@mocks/fixtures/team';
import { rest, RestHandler } from 'msw';

export const teamHandlers: RestHandler[] = [
	rest.get('/getMember', (_, res, ctx) => {
		return res(ctx.status(200), ctx.json(users));
	}),
];
