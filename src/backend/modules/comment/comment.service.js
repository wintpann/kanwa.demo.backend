import { v4 } from 'uuid';
import { di } from '../../utils/di.js';
import { findByPredicate } from '../../utils/common.js';
import { ResponseError } from '../../utils/response.js';

const CommentService = di.record(di.key()('db'), (db) => {
    const getById = async (id) => {
        return findByPredicate(db.data.comments, (comment) => comment.id === id);
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

        db.update();
        return comment;
    };

    const deleteComment = async (id) => {
        const [comment, index] = await getById(id);
        if (!comment) throw new ResponseError({ notifyMessage: 'No comment was found to delete' });

        db.data.comments.splice(index, 1);
        db.update();
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
