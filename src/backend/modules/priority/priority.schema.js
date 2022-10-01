import * as Yup from 'yup';

const PrioritySchemaDB = Yup.object().shape({
    id: Yup.string().trim().required(),
    userId: Yup.string().trim().required(),
    color: Yup.string().trim().required(),
    order: Yup.number().required(),
    title: Yup.string().trim().required(),
});

export { PrioritySchemaDB };
