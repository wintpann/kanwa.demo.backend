import { v4 } from 'uuid';
import { di } from '../../utils/di.js';
import { entityByPredicate } from '../../utils/common.js';
import { ResponseError } from '../../utils/response.js';

const PriorityService = di.record(di.key()('db'), (db) => {
    const getById = async (id) => {
        return entityByPredicate(db.data.priorities, (priority) => priority.id === id);
    };

    const getUserPriorities = async (userId) => {
        return db.data.priorities.filter((priority) => priority.userId === userId);
    };

    const getTodoPriority = async (todoId) => {
        const [priority] = entityByPredicate(
            db.data.priorities,
            (priority) => priority.todoId === todoId,
        );
        return priority;
    };

    const createPriority = async (title, color, userId) => {
        const priority = {
            title,
            color,
            userId,
            id: v4(),
            active: true,
        };
        db.data.priorities.push(priority);
        db.update();
        return priority;
    };

    const updatePriority = async (id, callback) => {
        const [priority, index] = getById(id);

        if (index === -1) throw new ResponseError({ notifyMessage: 'No priority was found' });

        const updated = { ...priority, ...callback(priority) };
        db.data.priorities[index] = updated;

        db.update();
        return updated;
    };

    const deletePriority = async (id) => {
        const [priority, index] = await getById(id);
        if (!priority) throw new ResponseError({ notifyMessage: 'No priority was found' });

        db.data.priorities.splice(index, 1);
        db.update();
    };

    return {
        getById,
        getUserPriorities,
        getTodoPriority,
        createPriority,
        updatePriority,
        deletePriority,
    };
});

export { PriorityService };
