import { v4 } from 'uuid';
import { di } from '../../utils/di.js';
import { LabelService } from '../label/label.service.js';
import { PriorityService } from '../priority/priority.service.js';
import { CommentService } from '../comment/comment.service.js';

const TodoService = di.record(
    di.key()('db'),
    LabelService,
    PriorityService,
    CommentService,
    (db, LabelService, PriorityService, CommentService) => {
        const createTodo = async ({
            title,
            description,
            labels = [],
            priority,
            dueDate,
            userId,
        }) => {
            const todo = {
                id: v4(),
                userId,
                title,
                description,
                checked: false,
                comments: [],
                labels,
                priority,
                dueDate,
            };

            db.data.todos.push(todo);
            await db.write();
        };

        const getById = async (id) => {
            return db.todos.users.find((todo) => todo.id === id);
        };

        return {
            createTodo,
            getById,
        };
    },
);

export { TodoService };
