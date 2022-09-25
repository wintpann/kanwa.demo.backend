import { Low, JSONFile } from 'lowdb';
import { resolve } from '../utils/dirname.js';
import { DBSchema } from './db.schema.js';
import { DB_INITIAL } from './db.initial.js';

const initLowDB = async () => {
    const file = resolve(import.meta.url, 'db.json');
    const adapter = new JSONFile(file);
    const db = new Low(adapter);

    try {
        await db.read();
        await DBSchema.validate(db.data, { strict: true });
    } catch (e) {
        db.data = DB_INITIAL;
    }

    await db.write();

    let shouldWrite = false;
    db.update = () => {
        shouldWrite = true;
    };

    const writeCron = async () => {
        if (shouldWrite) {
            shouldWrite = false;
            await db.write();
        }

        setTimeout(writeCron, 3000);
    };

    writeCron();

    return db;
};

export { initLowDB };
