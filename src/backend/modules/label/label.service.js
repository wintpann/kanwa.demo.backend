import { v4 } from 'uuid';
import { di } from '../../utils/di.js';
import { entityByPredicate } from '../../utils/common.js';
import { ResponseError } from '../../utils/response.js';

const LabelService = di.record(di.key()('db'), (db) => {
    const getById = async (id) => {
        return entityByPredicate(db.data.labels, (label) => label.id === id);
    };

    const getUserLabels = async (userId) => {
        return db.data.labels.filter((label) => label.userId === userId);
    };

    const getTodoLabels = async (todoId) => {
        return db.data.labels.filter((label) => label.todoId === todoId);
    };

    const createLabel = async (title, userId) => {
        const label = {
            title,
            userId,
            id: v4(),
            active: true,
        };
        db.data.labels.push(label);

        db.update();
        return label;
    };

    const updateLabel = async (id, callback) => {
        const [label, index] = await getById(id);

        if (index === -1) throw new ResponseError('No label was found');

        const updated = { ...label, ...callback(label) };
        db.data.labels[index] = updated;

        db.update();
        return updated;
    };

    const deleteLabel = async (id) => {
        const [label, index] = await getById(id);
        if (!label) throw new ResponseError('No label was found');

        db.data.labels.splice(index, 1);
        db.update();
    };

    return {
        getById,
        getUserLabels,
        getTodoLabels,
        createLabel,
        updateLabel,
        deleteLabel,
    };
});

export { LabelService };
