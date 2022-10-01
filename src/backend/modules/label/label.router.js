import { Router as ExpressRouter } from 'express';
import { di } from '../../utils/di.js';
import { LabelController } from './label.controller.js';

const LabelRouter = di.record(LabelController, (LabelController) => {
    const Router = ExpressRouter();

    Router.route('/labels').post(LabelController.createLabel);

    return Router;
});

export { LabelRouter };
