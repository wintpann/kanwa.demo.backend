import { di } from '../../utils/di.js';
import { UserService } from '../user/user.service.js';
import { createController, mapToResponseError, respond } from '../../utils/response.js';
import { CommentService } from './comment.service.js';
import { CreateCommentSchema, DeleteCommentSchema } from './comment.schema.js';

const CommentController = di.record(UserService, CommentService, (UserService, CommentService) => ({
    createComment: createController(async (req, res) => {
        const user = await UserService.auth(req);

        const commentData = await CreateCommentSchema.validate(req.body, { strict: true }).catch(
            mapToResponseError({ notifyMessage: 'Could not create comment, invalid data' }),
        );
        const comment = await CommentService.createComment({ ...commentData, userId: user.id });

        respond({ res, data: comment });
        // TODO TodoService.linkCommentTodo(comment.todoId, comment.id)
    }),
    deleteComment: createController(async (req, res) => {
        const user = await UserService.auth(req);

        const commentId = await DeleteCommentSchema.validate(req.query, { strict: true }).catch(
            mapToResponseError({ notifyMessage: 'Could not delete comment, invalid data' }),
        );
        const comment = await CommentService.deleteComment(commentId, user.id);

        respond({ res, data: comment });
        // TODO TodoService.unlinkCommentTodo(comment.todoId, comment.id)
    }),
}));

export { CommentController };
