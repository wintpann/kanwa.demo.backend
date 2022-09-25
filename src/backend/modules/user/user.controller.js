import { di } from '../../utils/di.js';
import { UserService } from './user.service.js';
import { LoginBodySchema } from './user.schema.js';
import {
    createController,
    mapToResponseError,
    respond,
    RESPONSE_CODE,
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

        respond(res, RESPONSE_CODE.OK, {
            user: cleanupUser(user),
            accessToken: `Bearer ${accessToken}`,
            refreshToken: `Bearer ${refreshToken}`,
        });
    }),
}));

export { UserController };
