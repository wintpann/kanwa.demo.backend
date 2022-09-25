import { pick } from '../../utils/common.js';

const cleanupUser = pick('id', 'login');

export { cleanupUser };
