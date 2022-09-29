import * as Yup from 'yup';

const TodoSchemaDB = Yup.object().shape({
    id: Yup.string().trim().required(),
    userId: Yup.string().trim().required(),
    title: Yup.string().trim().required(),
    description: Yup.string(),
    checked: Yup.boolean().required(),
    commentIds: Yup.array().of(Yup.string().trim().required()),
    labelIds: Yup.array().of(Yup.string().trim().required()),
    priorityId: Yup.string(),
    dueDateISO: Yup.date(),
});

const CreateTodoSchema = Yup.object().shape({
    title: Yup.string().trim().required(),
    description: Yup.string().trim(),
    labelIds: Yup.array().of(Yup.string().trim().required()),
    priorityId: Yup.string().trim(),
    dueDateISO: Yup.date(),
});

export { TodoSchemaDB, CreateTodoSchema };
