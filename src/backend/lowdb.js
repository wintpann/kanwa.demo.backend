import { Low, JSONFile } from 'lowdb';
import { resolve } from './utils/dirname.js';

const LowDB = {
    init: async () => {
        const file = resolve(import.meta.url, 'db.json');
        const adapter = new JSONFile(file);
        const db = new Low(adapter);

        await db.read();
    },
};

export { LowDB };