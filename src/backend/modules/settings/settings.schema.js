import * as Yup from 'yup';
import { LabelSchemaDB } from '../label/label.schema.js';
import { PrioritySchemaDB } from '../priority/priority.schema.js';

const SettingsSchemaDB = Yup.object().shape({
    labels: Yup.array().of(LabelSchemaDB).required(),
    priorities: Yup.array().of(PrioritySchemaDB).required(),
});

export { SettingsSchemaDB };
