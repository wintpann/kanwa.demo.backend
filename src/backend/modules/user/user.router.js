import { Router as ExpressRouter } from 'express';
import { di } from '../../utils/di.js';
import { UserController } from './user.controller.js';

const UserRouter = di.record(UserController, (UserController) => {
    const Router = ExpressRouter();

    Router.route('/user/ping').get(UserController.ping);

    return Router;
});

export { UserRouter };
