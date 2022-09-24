import * as Yup from 'yup';

const TodoSchemaDB = Yup.object().shape({
    id: Yup.string().trim().required(),
    userId: Yup.string().trim().required(),
    title: Yup.string().trim().required(),
    description: Yup.string(),
    checked: Yup.boolean().required(),
    comments: Yup.array().of(Yup.string().trim().required()),
    labels: Yup.array().of(Yup.string().trim().required()),
    priority: Yup.string(),
    dueDate: Yup.date().nullable(),
});

export { TodoSchemaDB };
