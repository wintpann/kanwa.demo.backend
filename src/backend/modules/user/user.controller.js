import { di } from '../../utils/di.js';
import { UserService } from './user.service.js';

const UserController = di.record(UserService, (UserService) => ({
    ping: async (req, res) => {
        res.json(UserService.ping());
    },
}));

export { UserController };
