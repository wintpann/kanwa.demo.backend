import { di } from '../../utils/di.js';
import { LabelService } from '../label/label.service.js';
import { PriorityService } from '../priority/priority.service.js';

const SettingsService = di.record(
    LabelService,
    PriorityService,
    (LabelService, PriorityService) => ({
        createLabel: LabelService.createLabel,
        createPriority: PriorityService.createPriority,
        updateLabel: LabelService.updateLabel,
        updatePriority: PriorityService.updatePriority,
        deleteLabel: LabelService.deleteLabel,
        deletePriority: PriorityService.deletePriority,
    }),
);

export { SettingsService };
