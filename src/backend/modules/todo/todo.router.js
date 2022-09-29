import { Router as ExpressRouter } from 'express';
import { di } from '../../utils/di.js';
import { TodoController } from './todo.controller.js';

const TodoRouter = di.record(TodoController, (TodoController) => {
    const Router = ExpressRouter();

    Router.route('/todos').post(TodoController.createTodo);

    return Router;
});

export { TodoRouter };
