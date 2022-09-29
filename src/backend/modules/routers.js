import { di } from '../utils/di.js';
import { PingPongRouter } from './ping-pong/ping-pong.router.js';
import { UserRouter } from './user/user.router.js';
import { TodoRouter } from './todo/todo.router.js';
import { CommentRouter } from './comment/comment.router.js';

const createRouters = di.record(
    UserRouter,
    PingPongRouter,
    TodoRouter,
    CommentRouter,
    (UserRouter, PingPongRouter, TodoRouter, CommentRouter) => ({
        PingPongRouter,
        UserRouter,
        TodoRouter,
        CommentRouter,
    }),
);

export { createRouters };
