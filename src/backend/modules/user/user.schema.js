import * as Yup from 'yup';

const UserSchemaDB = Yup.object().shape({
    id: Yup.string().trim().required(),
    nickname: Yup.string().trim().required(),
    login: Yup.string().trim().required(),
    password: Yup.string().trim().required(),
    refreshToken: Yup.string(),
    todos: Yup.array().of(Yup.string().trim().required()),
});

const LoginBodySchema = Yup.object().shape({
    login: Yup.string().trim().required(),
    password: Yup.string().trim().required(),
});

export { UserSchemaDB, LoginBodySchema };
