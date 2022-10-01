import { di } from '../utils/di.js';
import { PingPongRouter } from './ping-pong/ping-pong.router.js';
import { UserRouter } from './user/user.router.js';
import { TodoRouter } from './todo/todo.router.js';
import { CommentRouter } from './comment/comment.router.js';
import { LabelRouter } from './label/label.router.js';

const createRouters = di.record(
    UserRouter,
    PingPongRouter,
    TodoRouter,
    CommentRouter,
    LabelRouter,
    (UserRouter, PingPongRouter, TodoRouter, CommentRouter, LabelRouter) => ({
        PingPongRouter,
        UserRouter,
        TodoRouter,
        CommentRouter,
        LabelRouter,
    }),
);

export { createRouters };
