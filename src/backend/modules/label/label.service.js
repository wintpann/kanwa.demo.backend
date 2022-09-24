import { v4 } from 'uuid';
import { di } from '../../utils/di.js';
import { omit } from '../../utils/common.js';

const cleanup = omit('userId');
const sanitize = omit('id', 'userId');

const labelService = di.record(di.key()('db'), (db) => ({
    getUserLabels: async (userId, active) => {
        return db.data.labels
            .filter((label) => {
                const sameId = label.userId === userId;
                const sameActive = active !== undefined ? true : label.active === active;
                return sameId && sameActive;
            })
            .map(cleanup);
    },
    getTodoLabels: async (todoId) => {
        return db.data.labels.filter((label) => label.todoId === todoId).map(cleanup);
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
        return cleanup(label);
    },
    updateLabel: async (id, label) => {
        const labelIndex = db.data.labels.findIndex((label) => label.id === id);
        const updated = { ...db.data.labels[labelIndex], ...sanitize(label) };
        db.data.labels[labelIndex] = updated;
        await db.write();
        return cleanup(updated);
    },
}));
