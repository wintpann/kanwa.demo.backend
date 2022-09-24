import { v4 } from 'uuid';
import { di } from '../../utils/di.js';
import { omit } from '../../utils/common.js';

const cleanup = omit('userId', 'todoId');

const commentService = di.record(di.key()('db'), (db) => ({
    getUserComments: async (userId) => {
        return db.data.comments.filter((comment) => comment.userId === userId).map(cleanup);
    },
    getTodoComments: async (todoId) => {
        return db.data.comments.filter((comment) => comment.todoId === todoId).map(cleanup);
    },
    createComment: async (content, todoId, userId) => {
        const comment = {
            content,
            todoId,
            userId,
            id: v4(),
        };
        db.data.comments.push(comment);
        await db.write();
        return cleanup(comment);
    },
    deleteComment: async (id) => {
        const commentIndex = db.data.comments.findIndex((comment) => comment.id === id);
        db.data.comments.splice(commentIndex, 1);
        await db.write();
    },
}));