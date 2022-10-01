import _omit from 'lodash/omit.js';
import _pick from 'lodash/pick.js';
import _isNil from 'lodash/isNil.js';
import _omitBy from 'lodash/omitBy.js';

const omit =
    (...keys) =>
    (object) =>
        _omit(object, keys);

const pick =
    (...keys) =>
    (object) =>
        _pick(object, keys);

const findByPredicate = (array, predicate) => {
    const index = array.findIndex(predicate);
    if (index === -1) return [null, index];

    return [array[index], index];
};

const cleanObject = (obj) => _omitBy(obj, _isNil);

export { omit, pick, findByPredicate, cleanObject };
