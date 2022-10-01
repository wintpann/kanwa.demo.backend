import { v4 } from 'uuid';
import { di } from '../../utils/di.js';
import { findByPredicate } from '../../utils/common.js';

const PriorityService = di.record(di.key()('db'), (db) => {
    const getById = async (id) => {
        return findByPredicate(db.data.priorities, (priority) => priority.id === id);
    };

    const getUserPriorities = async (userId) => {
        return db.data.priorities.filter((priority) => priority.userId === userId);
    };

    const getTodoPriority = async (todoId) => {
        const [priority] = findByPredicate(
            db.data.priorities,
            (priority) => priority.todoId === todoId,
        );
        return priority;
    };

    const createPriority = async ({ title, color, userId, order }) => {
        const priority = {
            title,
            color,
            userId,
            id: v4(),
            order,
        };

        if (!priority.order) {
            const userPriorities = await getUserPriorities(userId);
            const maxOrder = Math.max(...userPriorities.map(({ order }) => order), 0);
            priority.order = maxOrder + 1;
        }

        db.data.priorities.push(priority);
        db.update();
        return priority;
    };

    const updatePriority = async (id, callback) => {
        const [priority, index] = getById(id);

        if (!priority) {
            throw new Error('No priority was found by id', id);
        }

        const updated = { ...priority, ...callback(priority) };
        db.data.priorities[index] = updated;

        db.update();
        return updated;
    };

    const deletePriority = async (id) => {
        const [priority, index] = await getById(id);
        if (!priority) {
            throw new Error('No priority was found by id', id);
        }

        db.data.priorities.splice(index, 1);
        db.update();
    };

    const ensurePriorityExists = async (userId, priorityId) => {
        if (!priorityId) return;

        const userPriorities = await getUserPriorities(userId);
        const priorityExists = userPriorities.some(({ id }) => id === priorityId);

        if (!priorityExists) {
            throw new Error('Provided priority does not exist');
        }
    };

    return {
        getById,
        getUserPriorities,
        getTodoPriority,
        createPriority,
        updatePriority,
        deletePriority,
        ensurePriorityExists,
    };
});

export { PriorityService };
