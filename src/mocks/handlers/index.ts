import { teamHandlers } from '@mocks/handlers/team';
import { userHandlers } from '@mocks/handlers/user';

export const handlers = [...teamHandlers, ...userHandlers];
