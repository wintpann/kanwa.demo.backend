import * as Yup from 'yup';

const CommentSchema = Yup.object().shape({
    id: Yup.string().trim().required(),
    userId: Yup.string().trim().required(),
    todoId: Yup.string().trim().required(),
    content: Yup.string().trim().required(),
});

export { CommentSchema };
