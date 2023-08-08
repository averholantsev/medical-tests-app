import * as yup from 'yup';
import { EMAIL_FIELD, REQUIRED_FIELD } from '@/src/constants/validation';

const passwordRules = new RegExp('^[a-zA-Z0-9]+$');

const schema = yup.object().shape({
  email: yup.string().email(EMAIL_FIELD).required(REQUIRED_FIELD),
  password: yup
    .string()
    .required(REQUIRED_FIELD)
    .min(6, 'Значение должно содержать не менее 6 символов')
    .matches(passwordRules, 'Должен содержать латинские буквы'),
});

export default schema;
