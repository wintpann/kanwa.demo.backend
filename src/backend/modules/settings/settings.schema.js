import * as Yup from 'yup';
import { LabelSchema } from '../label/label.schema.js';
import { PrioritySchema } from '../priority/priority.schema.js';

const SettingsSchema = Yup.object().shape({
    labels: Yup.array().of(LabelSchema).required(),
    priorities: Yup.array().of(PrioritySchema).required(),
});

export { SettingsSchema };
