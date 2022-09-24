import { v4 } from 'uuid';
import { di } from '../../utils/di.js';

const priorityService = di.record(di.key()('db'), (db) => ({
    getById: async (id) => {
        return db.data.priorities.find((priority) => priority.id === id);
    },
    getUserPriorities: async (userId, active) => {
        return db.data.priorities.filter((priority) => {
            const sameId = priority.userId === userId;
            const sameActive = active !== undefined ? true : priority.active === active;
            return sameId && sameActive;
        });
    },
    getTodoPriority: async (todoId) => {
        return db.data.priorities.find((priority) => priority.todoId === todoId);
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
        return priority;
    },
    updatePriority: async (id, callback) => {
        const priorityIndex = db.data.priorities.findIndex((priority) => priority.id === id);

        if (priorityIndex === -1) throw new Error('No priority was found by id', id);

        const priority = db.data.priorities[priorityIndex];
        const updated = { ...priority, ...callback(priority) };
        db.data.priorities[priorityIndex] = updated;

        await db.write();
        return updated;
    },
}));

export { priorityService };
