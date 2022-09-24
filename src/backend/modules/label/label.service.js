import { di } from '@kanwa/di';
import { v4 } from 'uuid';
import { omit } from '../../utils/common.js';

const cleanup = omit('userId', 'todoId');
const sanitize = omit('id', 'userId', 'todoId');

const labelService = di.record(di.key()('db'), (db) => ({
    getUserLabels: async (userId) => {
        return db.data.labels.filter((label) => label.userId === userId).map(cleanup);
    },
    getTodoLabels: async (todoId) => {
        return db.data.labels.filter((label) => label.todoId === todoId).map(cleanup);
    },
    createLabel: async (title, todoId, userId) => {
        const label = {
            title,
            todoId,
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
    deleteLabel: async (id) => {
        const labelIndex = db.data.labels.findIndex((label) => label.id === id);
        db.data.labels.splice(labelIndex, 1);
        await db.write();
    },
}));
