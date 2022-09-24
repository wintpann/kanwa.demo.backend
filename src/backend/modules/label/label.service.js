import { v4 } from 'uuid';
import { di } from '../../utils/di.js';

const LabelService = di.record(di.key()('db'), (db) => {
    const getById = async (id) => {
        return db.data.labels.find((label) => label.id === id);
    };

    const getUserLabels = async (userId, active) => {
        return db.data.labels.filter((label) => {
            const sameId = label.userId === userId;
            const sameActive = active !== undefined ? true : label.active === active;
            return sameId && sameActive;
        });
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
        const labelIndex = db.data.labels.findIndex((label) => label.id === id);

        if (labelIndex === -1) throw new Error('No label was found by id', id);

        const label = db.data.labels[labelIndex];
        const updated = { ...label, ...callback(label) };
        db.data.labels[labelIndex] = updated;

        await db.write();
        return updated;
    };

    return {
        getById,
        getUserLabels,
        getTodoLabels,
        createLabel,
        updateLabel,
    };
});

export { LabelService };
