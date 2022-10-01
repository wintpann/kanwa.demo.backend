import { di } from '../../utils/di.js';
import { createController, mapToResponseError, respond } from '../../utils/response.js';
import { LabelService } from './label.service.js';
import { UserService } from '../user/user.service.js';
import { CreateLabelSchemaBody } from './label.schema.js';

const LabelController = di.record(LabelService, UserService, (LabelService, UserService) => ({
    createLabel: createController(async (req, res) => {
        const user = await UserService.auth(req);
        const { title } = await CreateLabelSchemaBody.validate(req.body).catch(
            mapToResponseError({ notifyMessage: 'Could not create label, invalid data' }),
        );
        const label = await LabelService.createLabel(title, user.id);
        respond({ res, data: label });
    }),
}));

export { LabelController };
