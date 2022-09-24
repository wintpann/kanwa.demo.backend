import { v4 } from 'uuid';
import { di } from '../../utils/di.js';

const labelService = di.record(di.key()('db'), (db) => ({
    getById: async (id) => {
        return db.data.labels.find((label) => label.id === id);
    },
    getUserLabels: async (userId, active) => {
        return db.data.labels.filter((label) => {
            const sameId = label.userId === userId;
            const sameActive = active !== undefined ? true : label.active === active;
            return sameId && sameActive;
        });
    },
    getTodoLabels: async (todoId) => {
        return db.data.labels.filter((label) => label.todoId === todoId);
    },
    createLabel: async (title, userId) => {
        const label = {
            title,
            userId,
            id: v4(),
            active: true,
        };
        db.data.labels.push(label);

        await db.write();
        return label;
    },
    updateLabel: async (id, callback) => {
        const labelIndex = db.data.labels.findIndex((label) => label.id === id);

        if (labelIndex === -1) throw new Error('No label was found by id', id);

        const label = db.data.labels[labelIndex];
        const updated = { ...label, ...callback(label) };
        db.data.labels[labelIndex] = updated;

        await db.write();
        return updated;
    },
}));

export { labelService };
