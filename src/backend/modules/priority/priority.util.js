import { omit } from '../../utils/common.js';

const sanitizePriority = omit('id', 'userId');

export { sanitizePriority };
