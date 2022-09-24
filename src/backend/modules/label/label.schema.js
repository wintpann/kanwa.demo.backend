import * as Yup from 'yup';

const LabelSchema = Yup.object().shape({
    id: Yup.string().trim().required(),
    userId: Yup.string().trim().required(),
    todoId: Yup.string().trim().required(),
    title: Yup.string().trim().required(),
    active: Yup.boolean().required(),
});

export { LabelSchema };
