import { di } from '../../utils/di.js';

const UserService = di.record(() => ({
    ping: () => ({ data: 'pong' }),
}));

export { UserService };
