import _isNil from 'lodash/isNil.js';
import _omitBy from 'lodash/omitBy.js';

const findByPredicate = (array, predicate) => {
    const index = array.findIndex(predicate);
    if (index === -1) return [null, index];

    return [array[index], index];
};

const cleanObject = (obj) => _omitBy(obj, _isNil);

export { findByPredicate, cleanObject };
