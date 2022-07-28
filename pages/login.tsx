import { ApolloError } from '@apollo/client';
import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import * as Yup from 'yup';
import LoginInput from '../components/LoginInput';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';

const Login = (props) => {
  const [login] = useLoginMutation();
  const router = useRouter();
  const [errMsg, setErrMsg] = useState('');
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-gray-100'>
      <div className='mb-3 flex w-80 flex-col items-center border border-gray-300 bg-white pt-8 pb-4'>
        <h2
          className=' text-gray-800 dark:text-white'
          style={{ fontFamily: 'Grand Hotel', fontSize: '3rem' }}
        >
          Prismagram
        </h2>
        <Formik
          initialValues={{ username_or_email: '', password: '' }}
          validationSchema={Yup.object({
            password: Yup.string()
              .required('Password is required')
              .min(6, 'Password too short')
              .max(200, 'Password too long'),

            username_or_email: Yup.string()
              .required('Username or Email is required')
              // .email('Invalid email')
              .max(200, 'Username or Email too long'),
          })}
          onSubmit={async (values, actions) => {
            const creds = { ...values };
            actions.resetForm();
            try {
              const { data } = await login({
                variables: {
                  input: {
                    email_or_username: creds.username_or_email,
                    password: creds.password,
                  },
                },
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: 'Query',
                      me: data?.login,
                    },
                  });
                },
                onCompleted(data) {
                  if (data.login) {
                    router.push('/');
                  }
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
              <p className='text-center text-sm font-medium text-red-400'>
                {errMsg && errMsg}
              </p>
              <LoginInput
                label='Username or email'
                name='username_or_email'
                placeholder='Enter Username or email'
              />
              <LoginInput
                label='Password'
                name='password'
                type='password'
                placeholder='Enter password'
              />
              <button className='mt-2 rounded bg-blue-300 py-1 text-center text-sm font-medium text-white'>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </form>
          )}
        </Formik>
        <button
          className='mt-2 w-64 rounded bg-blue-500 py-1 text-center text-sm font-medium text-white'
          onClick={() => {
            // setTestLoading(true);
            login({
              variables: {
                input: { email_or_username: 'bob', password: 'password' },
              },
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: 'Query',
                    me: data?.login,
                  },
                });
              },
              onCompleted(data) {
                router.push('/');
              },
            });
          }}
        >
          Login as Guest
        </button>
      </div>
      <div className='w-80 border border-gray-300 bg-white py-4 text-center'>
        <span className='mr-2 text-sm'>Already have an account?</span>
        <Link href='/signup'>
          <a className='text-sm font-semibold text-blue-500'>Sign up</a>
        </Link>
      </div>
    </div>
  );
};

export default Login;
