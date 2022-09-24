import * as Yup from 'yup';
import { LabelSchema } from '../label/label.schema.js';
import { PrioritySchema } from '../priority/priority.schema.js';
import { CommentSchema } from '../comment/comment.schema.js';

const TodoSchema = Yup.object().shape({
    id: Yup.string().trim().required(),
    title: Yup.string().trim().required(),
    description: Yup.string().trim().required(),
    checked: Yup.boolean().required(),
    comments: Yup.array().of(CommentSchema),
    labels: Yup.array().of(LabelSchema),
    priority: PrioritySchema.nullable(),
    dueDate: Yup.date().nullable(),
});

export { TodoSchema };
