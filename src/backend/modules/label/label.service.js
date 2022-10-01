import { v4 } from 'uuid';
import { di } from '../../utils/di.js';
import { findByPredicate } from '../../utils/common.js';

const LabelService = di.record(di.key()('db'), (db) => {
    const getById = async (id) => {
        return findByPredicate(db.data.labels, (label) => label.id === id);
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
        };
        db.data.labels.push(label);

        db.update();
        return label;
    };

    const updateLabel = async (id, callback) => {
        const [label, index] = await getById(id);

        if (!label) {
            throw new Error('No label was found by id', id);
        }

        const updated = { ...label, ...callback(label) };
        db.data.labels[index] = updated;

        db.update();
        return updated;
    };

    const deleteLabel = async (id) => {
        const [label, index] = await getById(id);
        if (!label) {
            throw new Error('No label was found by id', id);
        }

        db.data.labels.splice(index, 1);
        db.update();
    };

    const ensureLabelsExist = async (userId, labelIds) => {
        const userLabels = await getUserLabels(userId);
        const userLabelsSet = new Set(userLabels.map(({ id }) => id));

        const allLabelsExist = labelIds.every((id) => userLabelsSet.has(id));
        if (!allLabelsExist) {
            throw new Error('Not all provided labels exist');
        }
    };

    return {
        getById,
        getUserLabels,
        getTodoLabels,
        createLabel,
        updateLabel,
        deleteLabel,
        ensureLabelsExist,
    };
});

export { LabelService };
