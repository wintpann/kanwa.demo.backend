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
    PriorityService,
    (db, CommentService, LabelService, PriorityService) => {
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
            priorityId = null,
            dueDateISO = null,
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

            return await populate(todo);
        };

        const ensureTodoExists = async (id) => {
            const [todo] = await getById(id);
            if (!todo) {
                throw new Error('No todo was found by id', id);
            }
        };

        const linkCommentTodo = async (userId, todoId, commentId) => {
            await updateTodo(userId, todoId, (todo) => ({
                ...todo,
                commentIds: [...todo.commentIds, commentId],
            }));
        };

        const unlinkCommentTodo = async (userId, todoId, commentId) => {
            await updateTodo(userId, todoId, (todo) => ({
                ...todo,
                commentIds: todo.commentIds.filter((id) => id !== commentId),
            }));
        };

        const updateTodo = async (userId, id, callback) => {
            const [todo, index] = await getById(id);
            if (!todo || todo.userId !== userId) {
                throw new Error('No todo was found by id', id);
            }

            const updated = { ...todo, ...callback(todo) };

            await LabelService.ensureLabelsExist(userId, updated.labelIds);
            await PriorityService.ensurePriorityExists(userId, updated.priorityId);
            await CommentService.ensureCommentsExist(userId, updated.commentIds);

            db.data.todos[index] = updated;
            db.update();

            return await populate(updated);
        };

        const getById = async (id) => {
            return findByPredicate(db.data.todos, (todo) => todo.id === id);
        };

        const deleteTodo = async (userId, id) => {
            const [todo, index] = await getById(id);

            if (!todo || todo.userId !== userId) {
                throw new Error('No todo was found by id', id);
            }

            db.data.todos.splice(index, 1);
            db.update();
            return todo;
        };

        return {
            createTodo,
            deleteTodo,
            getById,
            ensureTodoExists,
            populate,
            linkCommentTodo,
            unlinkCommentTodo,
            updateTodo,
        };
    },
);

export { TodoService };
