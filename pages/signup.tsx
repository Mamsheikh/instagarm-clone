import { ApolloError } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import LoginInput from '../components/LoginInput';
import { useSignupMutation } from '../generated/graphql';
import { registrationValidation } from '../utils/registrationValidation';

const Signup = (props) => {
  const [errMsg, setErrMsg] = useState('');
  const [signup, { loading }] = useSignupMutation();
  const router = useRouter();

  const redirectToLoginPage = (path = '/login') => {
    toast.success('You have successfully signed up!');
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-gray-100'>
      <div className='mb-3 flex w-80 flex-col items-center border-gray-300 pt-8  pb-4 sm:border sm:bg-white'>
        <h2
          className=' text-gray-800 dark:text-white'
          style={{ fontFamily: 'Grand Hotel', fontSize: '3rem' }}
        >
          Prismagram
        </h2>
        <Formik
          initialValues={{
            email: '',
            username: '',
            password: '',
            confirm: '',
          }}
          validationSchema={Yup.object({
            username: Yup.string()
              .required('username is required')
              .max(200, 'username too long'),
            password: Yup.string()
              .required('Password is required')
              .min(6, 'Password too short')
              .max(200, 'Password too long'),
            confirm: Yup.string()
              .required('Password confirmation is required')
              .oneOf([Yup.ref('password'), null], "Passwords don't match"),
            email: Yup.string()
              .required('Email is required')
              .email('Invalid email')
              .max(200, 'Email too long'),
          })}
          onSubmit={async (values, actions) => {
            const creds = { ...values };
            // actions.resetForm();
            try {
              const { data } = await signup({
                variables: {
                  input: {
                    email: creds.email,
                    password: creds.password,
                    username: creds.username,
                  },
                },
                onCompleted: (data) => {
                  redirectToLoginPage();
                },
              });
            } catch (error) {
              setErrMsg((error as ApolloError).message);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit} className='mt-8 flex w-64 flex-col '>
              <LoginInput
                label='Username'
                name='username'
                type='text'
                placeholder='Enter Username'
              />
              <LoginInput
                label='Email'
                type='email'
                name='email'
                placeholder='Enter Email address'
              />
              <LoginInput
                label='Password'
                name='password'
                type='password'
                placeholder='Enter password'
              />
              <LoginInput
                label='Confirm Password'
                name='confirm'
                type='password'
                placeholder='Confirm password'
              />
              <button className='mt-2 rounded bg-blue-300 py-1 text-center text-sm font-medium text-white'>
                {isSubmitting ? 'signing you up' : 'Sign up'}
              </button>
            </form>
          )}
        </Formik>
      </div>
      <div className='w-80 bg-white py-4 text-center sm:border sm:border-gray-300'>
        <span className='mr-2 text-sm'>Don't have an account?</span>
        <Link href='/login'>
          <a className='text-sm font-semibold text-blue-500'>Login</a>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
