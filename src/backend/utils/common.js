import _omit from 'lodash/omit.js';
import _pick from 'lodash/pick.js';

const omit =
    (...keys) =>
    (object) =>
        _omit(object, keys);

const pick =
    (...keys) =>
    (object) =>
        _pick(object, keys);

const entityByPredicate = (array, predicate) => {
    const index = array.findIndex(predicate);
    if (index === -1) return [null, index];

    return [array[index], index];
};

export { omit, pick, entityByPredicate };
