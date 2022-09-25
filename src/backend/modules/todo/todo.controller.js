import { di } from '../../utils/di.js';
import { TodoService } from './todo.service.js';
import { UserService } from '../user/user.service.js';
import { CreateTodoSchema } from './todo.schema.js';
import { createController, mapToResponseError, respond, RESPONSE } from '../../utils/response.js';

const TodoController = di.record(TodoService, UserService, (TodoService, UserService) => ({
    createTodo: createController(async (req, res) => {
        const user = await UserService.auth(req);

        const todoData = await CreateTodoSchema.validate(req.body, { strict: true }).catch(
            mapToResponseError({ notifyMessage: 'Could not create todo, invalid data' }),
        );
        const todo = await TodoService.createTodo({ ...todoData, userId: user.id });

        respond({ res, data: todo });
    }),
}));

export { TodoController };
