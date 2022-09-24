import * as Yup from 'yup';
import { TodoSchema } from '../user/todo.schema.js';

const UserSchema = Yup.object().shape({
    id: Yup.string().trim().required(),
    nickname: Yup.string().trim().required(),
    login: Yup.string().trim().required(),
    password: Yup.string().trim().required(),
    todos: Yup.array().of(TodoSchema),
});

export { UserSchema };
