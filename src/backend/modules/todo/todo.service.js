import { v4 } from 'uuid';
import { di } from '../../utils/di.js';
import { CommentService } from '../comment/comment.service.js';
import { LabelService } from '../label/label.service.js';
import { PriorityService } from '../priority/priority.service.js';
import { findByPredicate } from '../../utils/common.js';

const TodoService = di.record(
    di.key()('db'),
    CommentService,
    LabelService,
    (db, CommentService, LabelService) => {
        const populate = async (todo) => {
            const comments = await Promise.all(
                todo.commentIds.map(async (commentId) => {
                    const [comment] = await CommentService.getById(commentId);
                    return comment;
                }),
            );

            const labels = await Promise.all(
                todo.labelIds.map(async (labelId) => {
                    const [label] = await LabelService.getById(labelId);
                    return label;
                }),
            );

            const [priority] = todo.priorityId
                ? await PriorityService.getById(todo.priorityId)
                : [null];

            return {
                id: todo.id,
                userId: todo.userId,
                title: todo.title,
                description: todo.description,
                checked: todo.checked,
                dueDateISO: todo.dueDateISO,
                comments,
                labels,
                priority,
            };
        };

        const createTodo = async ({
            title,
            description,
            labelIds = [],
            priorityId,
            dueDateISO,
            userId,
        }) => {
            const todo = {
                id: v4(),
                userId,
                title,
                description,
                checked: false,
                commentIds: [],
                labelIds,
                priorityId,
                dueDateISO,
            };

            db.data.todos.push(todo);
            db.update();

            return populate(todo);
        };

        const getById = async (id) => {
            return findByPredicate(db.todos, (todo) => todo.id === id);
        };

        const deleteTodo = async (id) => {
            const [todo, index] = await getById(id);

            if (!todo) {
                throw new Error('No todo was found by id', id);
            }

            todo.commentIds.forEach((commentId) => {
                CommentService.deleteComment(commentId);
            });
            db.data.todos.splice(index, 1);
            db.update();
        };

        return {
            createTodo,
            deleteTodo,
            getById,
            populate,
        };
    },
);

export { TodoService };
