import { pick } from '../../utils/common.js';

const cleanupUser = pick('id', 'nickname');

export { cleanupUser };
