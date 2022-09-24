import { Low, JSONFile } from 'lowdb';
import { resolve } from './utils/dirname.js';

const LowDB = {
    init: async () => {
        const file = resolve(import.meta.url, 'db.json');
        const adapter = new JSONFile(file);
        const db = new Low(adapter);
        LowDB.db = db;

        await db.read();
    },
    db: null,
};

export { LowDB };