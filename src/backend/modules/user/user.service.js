import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { di } from '../../utils/di.js';
import { entityByPredicate } from '../../utils/common.js';
import { ResponseError } from '../../utils/response.js';
import bcrypt from 'bcryptjs';

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
            (user) => user.id === userLike.id || user.login === userLike.login,
        );
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

    return {
        createTokens,
        getBy,
        updateUser,
        validatePassword,
    };
});

export { UserService };
