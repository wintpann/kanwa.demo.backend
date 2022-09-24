import * as Yup from 'yup';
import { CommentSchema } from '../modules/comment/comment.schema.js';
import { LabelSchema } from '../modules/label/label.schema.js';
import { PrioritySchema } from '../modules/priority/priority.schema.js';
import { SettingsSchema } from '../modules/settings/settings.schema.js';
import { TodoSchema } from '../modules/user/todo.schema.js';
import { UserSchema } from '../modules/todo/user.schema.js';

const DBSchema = Yup.object().shape({
    comments: Yup.array().of(CommentSchema).required(),
    labels: Yup.array().of(LabelSchema).required(),
    priorities: Yup.array().of(PrioritySchema).required(),
    settings: Yup.array().of(SettingsSchema).required(),
    todos: Yup.array().of(TodoSchema).required(),
    users: Yup.array().of(UserSchema).required(),
});

export { DBSchema };
