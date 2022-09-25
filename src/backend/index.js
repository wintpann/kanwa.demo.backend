import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { resolve } from './utils/dirname.js';
import { initLowDB } from './db/index.js';
import { createRouters } from './modules/routers.js';

dotenv.config({ path: resolve(import.meta.url, '.env') });

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const db = await initLowDB();
const Routers = createRouters({ db });

app.use('/api', Routers.PingPongRouter);
app.use('/api', Routers.UserRouter);
app.use('/api', Routers.TodoRouter);

app.listen(process.env.PORT, () => console.log('BACKEND IS RUNNING ON PORT', process.env.PORT));
