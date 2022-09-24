import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { resolve } from './utils/dirname.js';

import { PingPongRouter } from './modules/ping-pong/ping-pong.router.js';
import { LowDB } from './lowdb.js';

dotenv.config({ path: resolve(import.meta.url, '.env') });

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', PingPongRouter);

LowDB.init().then(() => {
    app.listen(process.env.PORT, () => console.log('BACKEND IS RUNNING ON PORT', process.env.PORT));
});
