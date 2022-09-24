import * as Yup from 'yup';

const PrioritySchema = Yup.object().shape({
    id: Yup.string().trim().required(),
    userId: Yup.string().trim().required(),
    color: Yup.string().trim().required(),
    title: Yup.string().trim().required(),
    active: Yup.boolean().required(),
});

export { PrioritySchema };
