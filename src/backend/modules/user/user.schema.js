import * as Yup from 'yup';

const UserSchemaDB = Yup.object().shape({
    id: Yup.string().trim().required(),
    login: Yup.string().trim().required(),
    password: Yup.string().trim().required(),
    refreshToken: Yup.string(),
    todoIds: Yup.array().of(Yup.string().trim().required()),
    labelIds: Yup.array().of(Yup.string().trim().required()),
    priorityIds: Yup.array().of(Yup.string().trim().required()),
});

const LoginBodySchema = Yup.object().shape({
    login: Yup.string('login should be a string').trim().required('login is required'),
    password: Yup.string('password should be a string').trim().required('password is required'),
});

const SignupBodySchema = LoginBodySchema;

const AuthHeaderSchema = Yup.string('Authorization header should be a string')
    .trim()
    .required('Authorization header not provided');

const RefreshHeaderSchema = AuthHeaderSchema;

export { UserSchemaDB, LoginBodySchema, SignupBodySchema, AuthHeaderSchema, RefreshHeaderSchema };
