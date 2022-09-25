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
    dueDateISO: Yup.date().nullable(),
});

const CreateTodoSchema = Yup.object().shape({
    title: Yup.string('title should be a string').trim().required('title is required'),
    description: Yup.string('description should be a string').trim(),
    labelIds: Yup.array('labelIds should be an array').of(
        Yup.string('label id should be a string').trim().required('label id should not be empty'),
    ),
    priorityId: Yup.string('priorityId should be a string').trim(),
    dueDateISO: Yup.date('dueDateISO should be a Date ISO string'),
});

export { TodoSchemaDB, CreateTodoSchema };
