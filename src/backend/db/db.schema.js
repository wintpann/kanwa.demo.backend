import * as Yup from 'yup';
import { CommentSchemaDB } from '../modules/comment/comment.schema.js';
import { SettingsSchemaDB } from '../modules/settings/settings.schema.js';
import { TodoSchemaDB } from '../modules/todo/todo.schema.js';
import { UserSchemaDB } from '../modules/user/user.schema.js';

const DBSchema = Yup.object().shape({
    comments: Yup.array().of(CommentSchemaDB).required(),
    settings: SettingsSchemaDB,
    todos: Yup.array().of(TodoSchemaDB).required(),
    users: Yup.array().of(UserSchemaDB).required(),
});

export { DBSchema };
