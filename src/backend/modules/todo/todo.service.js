import { v4 } from 'uuid';
import { di } from '../../utils/di.js';
import { CommentService } from '../comment/comment.service.js';
import { entityByPredicate } from '../../utils/common.js';

const TodoService = di.record(di.key()('db'), CommentService, (db, CommentService) => {
    const createTodo = async ({ title, description, labels = [], priority, dueDate, userId }) => {
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
        db.update();
    };

    const getById = async (id) => {
        return entityByPredicate(db.todos, (todo) => todo.id === id);
    };

    const deleteTodo = async (id) => {
        const [todo, index] = await getById(id);

        if (!todo) throw new Error('No todo was found by id', id);

        todo.comments.forEach((commentId) => {
            CommentService.deleteComment(commentId);
        });
        db.data.todos.splice(index, 1);
        db.update();
    };

    return {
        createTodo,
        deleteTodo,
        getById,
    };
});

export { TodoService };
