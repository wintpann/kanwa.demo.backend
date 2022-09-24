import _omit from 'lodash/omit.js';

const omit =
    (...keys) =>
    (object) =>
        _omit(object, keys);

export { omit };
