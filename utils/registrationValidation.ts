import * as Yup from 'yup';

export const registrationValidation = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password too short')
    .max(200, 'Password too long'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email')
    .max(200, 'Email too long'),
});

export const loginValidation = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password too short')
    .max(200, 'Password too long'),
  email_or_username: Yup.string().required('Email or username is required'),
  // .email('Invalid email')
  // .max(200, 'Email too long'),
});
