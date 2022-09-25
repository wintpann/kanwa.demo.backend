import _omit from 'lodash/omit.js';

const omit =
    (...keys) =>
    (object) =>
        _omit(object, keys);

const entityByPredicate = (array, predicate) => {
    const index = array.findIndex(predicate);
    if (index === -1) return [null, index];

    return [array[index], index];
};

export { omit, entityByPredicate };
