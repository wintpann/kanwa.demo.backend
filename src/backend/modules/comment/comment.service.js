import { v4 } from 'uuid';
import { di } from '../../utils/di.js';

const CommentService = di.record(di.key()('db'), (db) => {
    const getById = async (id) => {
        return db.data.comments.find((comment) => comment.id === id);
    };

    const getUserComments = async (userId) => {
        return db.data.comments.filter((comment) => comment.userId === userId);
    };

    const getTodoComments = async (todoId) => {
        return db.data.comments.filter((comment) => comment.todoId === todoId);
    };

    const createComment = async (content, todoId, userId) => {
        const comment = {
            content,
            todoId,
            userId,
            id: v4(),
        };
        db.data.comments.push(comment);

        await db.write();
        return comment;
    };

    const deleteComment = async (id) => {
        const commentIndex = db.data.comments.findIndex((comment) => comment.id === id);
        db.data.comments.splice(commentIndex, 1);

        await db.write();
    };

    return {
        getById,
        getUserComments,
        getTodoComments,
        createComment,
        deleteComment,
    };
});

export { CommentService };
