import * as yup from 'yup';
import {
  EMAIL_FIELD,
  REQUIRED_FIELD,
  passwordRegexp,
} from '@/src/constants/validation';

const schema = yup.object().shape({
  firstName: yup.string().required(REQUIRED_FIELD),
  lastName: yup.string().required(REQUIRED_FIELD),
  birthday: yup.object().required(REQUIRED_FIELD),
  gender: yup.string().required(REQUIRED_FIELD),
  email: yup.string().email(EMAIL_FIELD).required(REQUIRED_FIELD),
  password: yup
    .string()
    .required(REQUIRED_FIELD)
    .min(6, 'Значение должно содержать не менее 6 символов')
    .matches(passwordRegexp, 'Должен содержать латинские буквы'),
});

export default schema;
