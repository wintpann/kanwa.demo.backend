import { di } from '../utils/di.js';
import { PingPongRouter } from './ping-pong/ping-pong.router.js';
import { UserRouter } from './user/user.router.js';

const createRouters = di.record(UserRouter, PingPongRouter, (UserRouter, PingPongRouter) => ({
    PingPongRouter,
    UserRouter,
}));

export { createRouters };
