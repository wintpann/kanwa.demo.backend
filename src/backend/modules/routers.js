import { di } from '../utils/di.js';
import { PingPongRouter } from './ping-pong/ping-pong.router.js';
import { UserRouter } from './user/user.router.js';
import { TodoRouter } from './todo/todo.router.js';

const createRouters = di.record(
    UserRouter,
    PingPongRouter,
    TodoRouter,
    (UserRouter, PingPongRouter, TodoRouter) => ({
        PingPongRouter,
        UserRouter,
        TodoRouter,
    }),
);

export { createRouters };
