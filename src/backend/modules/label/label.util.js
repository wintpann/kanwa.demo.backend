import { omit } from '../../utils/common.js';

const sanitizeLabel = omit('id', 'userId');

export { sanitizeLabel };
