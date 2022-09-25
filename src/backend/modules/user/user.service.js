import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { di } from '../../utils/di.js';
import { entityByPredicate } from '../../utils/common.js';
import { mapToResponseError, RESPONSE, ResponseError } from '../../utils/response.js';
import { AuthHeaderSchema, RefreshHeaderSchema } from './user.schema.js';

const UserService = di.record(di.key()('db'), (db) => {
    const createTokens = (user) => {
        const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        const refreshToken = uuid();

        return { accessToken, refreshToken };
    };

    const getBy = async (userLike) => {
        return entityByPredicate(
            db.data.users,
            (user) =>
                user.id === userLike.id ||
                user.login === userLike.login ||
                user.refreshToken === userLike.refreshToken,
        );
    };

    const createUser = async (userData) => {
        const [sameUser] = await getBy({ login: userData.login });

        if (sameUser) throw new ResponseError('User with this login already exists');

        const password = await bcrypt.hash(userData.password, 12);

        const user = {
            id: uuid(),
            login: userData.login,
            password,
            refreshToken: '',
            todoIds: [],
            labelIds: [],
            priorityIds: [],
        };

        db.data.users.push(user);
        db.update();

        return user;
    };

    const updateUser = async (userLike, callback) => {
        const [user, index] = await getBy(userLike);

        if (index === -1) throw new ResponseError('No user was found');

        const updated = { ...user, ...callback(user) };
        db.data.users[index] = updated;

        db.update();
        return updated;
    };

    const validatePassword = async (user, password) => {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            throw new ResponseError('Incorrect password');
        }
    };

    const auth = async (req) => {
        const authorization = await AuthHeaderSchema.validate(req.headers.authorization).catch(
            mapToResponseError('AuthorizationTokenNotProvided', RESPONSE.AUTH_REQUIRED),
        );

        const payload = jwt.decode(authorization, process.env.JWT_SECRET);

        if (!payload) {
            throw new ResponseError('AuthorizationTokenInvalid', RESPONSE.AUTH_REQUIRED);
        }

        try {
            jwt.verify(authorization, process.env.JWT_SECRET);
        } catch (e) {
            console.log(e);
            if (e instanceof jwt.TokenExpiredError) {
                throw new ResponseError('AuthorizationTokenExpired', RESPONSE.AUTH_REQUIRED);
            } else {
                throw new ResponseError('AuthorizationTokenInvalid', RESPONSE.AUTH_REQUIRED);
            }
        }

        const [user] = await getBy({ id: payload.userId });
        if (!user) throw new ResponseError('NoUserFound', RESPONSE.AUTH_REQUIRED);

        return user;
    };

    const refresh = async (req) => {
        const refreshToken = await RefreshHeaderSchema.validate(req.headers.refresh).catch(
            mapToResponseError('RefreshTokenNotProvided', RESPONSE.AUTH_REQUIRED),
        );

        const [user] = await getBy({ refreshToken });
        if (!user) throw new ResponseError('NoUserFound', RESPONSE.AUTH_REQUIRED);

        const { accessToken, refreshToken: newRefreshToken } = createTokens(user);
        await updateUser(user, (user) => ({ ...user, refreshToken: newRefreshToken }));

        return { user, accessToken, refreshToken: newRefreshToken };
    };

    return {
        createTokens,
        getBy,
        updateUser,
        createUser,
        validatePassword,
        auth,
        refresh,
    };
});

export { UserService };
