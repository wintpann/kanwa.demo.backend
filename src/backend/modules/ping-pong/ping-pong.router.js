import { Router } from 'express';
import { PingPongController } from './ping-pong.controller.js';

const PingPongRouter = Router();

PingPongRouter.route('/ping').get(PingPongController.ping);

export { PingPongRouter };
