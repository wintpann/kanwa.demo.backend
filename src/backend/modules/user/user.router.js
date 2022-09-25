import { Router as ExpressRouter } from 'express';
import { di } from '../../utils/di.js';
import { UserController } from './user.controller.js';

const UserRouter = di.record(UserController, (UserController) => {
    const Router = ExpressRouter();

    Router.route('/user/login').post(UserController.login);
    Router.route('/user/signup').post(UserController.signup);
    Router.route('/user/refresh').post(UserController.refresh);
    Router.route('/user/me').get(UserController.me);

    return Router;
});

export { UserRouter };
