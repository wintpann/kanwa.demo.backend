import { Router as ExpressRouter } from 'express';
import { di } from '../../utils/di.js';
import { UserController } from './user.controller.js';

const UserRouter = di.record(UserController, (UserController) => {
    const Router = ExpressRouter();

    Router.route('/user/login').get(UserController.login);
    Router.route('/user/signup').get(UserController.signup);

    return Router;
});

export { UserRouter };
