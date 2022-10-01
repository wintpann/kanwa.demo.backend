import { di } from '../../utils/di.js';
import {
    createController,
    mapToResponseError,
    respond,
    ResponseError,
} from '../../utils/response.js';
import { LabelService } from './label.service.js';
import { UserService } from '../user/user.service.js';
import {
    CreateLabelSchemaBody,
    UpdateLabelSchemaBody,
    UpdateLabelSchemaQuery,
} from './label.schema.js';

const LabelController = di.record(LabelService, UserService, (LabelService, UserService) => ({
    createLabel: createController(async (req, res) => {
        const user = await UserService.auth(req);

        const { title } = await CreateLabelSchemaBody.validate(req.body).catch(
            mapToResponseError({ notifyMessage: 'Could not create label, invalid data' }),
        );
        const isUnique = await LabelService.isTitleUnique(user.id, title);

        if (!isUnique) {
            throw new ResponseError({ notifyMessage: 'Label title should be unique' });
        }

        const label = await LabelService.createLabel(title, user.id);
        respond({ res, data: label });
    }),
    updateLabel: createController(async (req, res) => {
        const user = await UserService.auth(req);

        const { id } = await UpdateLabelSchemaQuery.validate(req.params).catch(
            mapToResponseError({ notifyMessage: 'Could not update label, invalid data' }),
        );
        const { title } = await UpdateLabelSchemaBody.validate(req.body).catch(
            mapToResponseError({ notifyMessage: 'Could not update label, invalid data' }),
        );

        const isUnique = await LabelService.isTitleUnique(user.id, title);

        if (!isUnique) {
            throw new ResponseError({ notifyMessage: 'Label title should be unique' });
        }

        const label = await LabelService.updateLabel(user.id, id, (label) => ({ ...label, title }));
        respond({ res, data: label });
    }),
}));

export { LabelController };
