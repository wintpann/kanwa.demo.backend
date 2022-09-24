import { v4 } from 'uuid';
import { di } from '../../utils/di.js';

const commentService = di.record(di.key()('db'), (db) => ({
    getById: async (id) => {
        return db.data.comments.find((comment) => comment.id === id);
    },
    getUserComments: async (userId) => {
        return db.data.comments.filter((comment) => comment.userId === userId);
    },
    getTodoComments: async (todoId) => {
        return db.data.comments.filter((comment) => comment.todoId === todoId);
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
        return comment;
    },
    deleteComment: async (id) => {
        const commentIndex = db.data.comments.findIndex((comment) => comment.id === id);
        db.data.comments.splice(commentIndex, 1);

        await db.write();
    },
}));

export { commentService };
