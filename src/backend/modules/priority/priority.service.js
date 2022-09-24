import { v4 } from 'uuid';
import { di } from '../../utils/di.js';
import { omit } from '../../utils/common.js';

const cleanup = omit('userId');
const sanitize = omit('id', 'userId');

const priorityService = di.record(di.key()('db'), (db) => ({
    getUserPriorities: async (userId, active) => {
        return db.data.priorities.filter((priority) => {
            const sameId = priority.userId === userId;
            const sameActive = active !== undefined ? true : priority.active === active;
            return sameId && sameActive;
        }).map(cleanup);
    },
    getTodoPriority: async (todoId) => {
        const priority = db.data.priorities.find((priority) => priority.todoId === todoId);
        if (!priority) return null;
        return cleanup(priority);
    },
    createPriority: async (title, color, userId) => {
        const priority = {
            title,
            color,
            userId,
            id: v4(),
            active: true,
        };
        db.data.priorities.push(priority);
        await db.write();
        return cleanup(priority);
    },
    updatePriority: async (id, priority) => {
        const priorityIndex = db.data.priorities.findIndex((priority) => priority.id === id);
        const updated = { ...db.data.priorities[priorityIndex], ...sanitize(priority) };
        db.data.priorities[priorityIndex] = updated;
        await db.write();
        return cleanup(updated);
    }
}));
