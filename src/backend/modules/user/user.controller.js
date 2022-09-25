import { di } from '../../utils/di.js';
import { UserService } from './user.service.js';
import { LoginBodySchema, SignupBodySchema } from './user.schema.js';
import {
    createController,
    mapToResponseError,
    respond,
    RESPONSE,
    ResponseError,
} from '../../utils/response.js';
import { cleanupUser } from './user.util.js';

const UserController = di.record(UserService, (UserService) => ({
    login: createController(async (req, res) => {
        const { login, password } = await LoginBodySchema.validate(req.body.user).catch(
            mapToResponseError('Login and password is required'),
        );

        const [user] = await UserService.getBy({ login });

        if (!user) {
            throw new ResponseError('No user was found');
        }

        await UserService.validatePassword(user, password);
        const { accessToken, refreshToken } = UserService.createTokens(user);
        await UserService.updateUser(user, (user) => ({ ...user, refreshToken }));

        respond(res, RESPONSE.OK, {
            user: cleanupUser(user),
            accessToken,
            refreshToken,
        });
    }),
    signup: createController(async (req, res) => {
        const { login, password } = await SignupBodySchema.validate(req.body.user).catch(
            mapToResponseError('Login and password is required'),
        );

        const user = await UserService.createUser({ login, password });
        const { accessToken, refreshToken } = UserService.createTokens(user);
        await UserService.updateUser(user, (user) => ({ ...user, refreshToken }));

        respond(res, RESPONSE.OK, {
            user: cleanupUser(user),
            accessToken,
            refreshToken,
        });
    }),
    me: createController(async (req, res) => {
        const user = await UserService.auth(req);

        respond(res, RESPONSE.OK, {
            user: cleanupUser(user),
        });
    }),
}));

export { UserController };
