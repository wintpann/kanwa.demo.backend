import { di } from '../../utils/di.js';
import { labelService } from '../label/label.service.js';
import { priorityService } from '../priority/priority.service.js';

const settingsService = di.record(
    labelService,
    priorityService,
    (labelService, priorityService) => ({
        createLabel: labelService.createLabel,
        createPriority: priorityService.createPriority,
        updateLabel: labelService.updateLabel,
        updatePriority: priorityService.updatePriority,
    }),
);
