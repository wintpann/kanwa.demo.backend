import { v4 } from 'uuid';
import { di } from '../../utils/di.js';
import { entityByPredicate } from '../../utils/common.js';

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

        await db.write();
        return label;
    };

    const updateLabel = async (id, callback) => {
        const [label, index] = await getById(id);

        if (index === -1) throw new Error('No label was found by id', id);

        const updated = { ...label, ...callback(label) };
        db.data.labels[index] = updated;

        await db.write();
        return updated;
    };

    const deleteLabel = async (id) => {
        const [label, index] = await getById(id);
        if (!label) throw new Error('No label was found by id', id);

        db.data.labels.splice(index, 1);
        await db.write();
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
