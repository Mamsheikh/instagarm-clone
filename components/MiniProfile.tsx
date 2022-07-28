import image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { userState } from '../atoms/userState';
import { useLogoutMutationMutation } from '../generated/graphql';

const MiniProfile = () => {
  const [viewer, setViewer] = useRecoilState(userState);
  const router = useRouter();
  const [logout, { client }] = useLogoutMutationMutation();
  return (
    <div className='mt-10 ml-10 flex items-center justify-center'>
      <div className=' rounded-full object-cover'>
        {viewer?.image ? (
          <img
            className='h-12 w-12 rounded-full'
            src={viewer?.image}
            alt='profile'
          />
        ) : (
          <FaUserCircle className='h-10 w-10' />
        )}
      </div>
      <div className='mx-4 flex-1'>
        <h2 className='font-bold dark:text-gray-300'>{viewer?.username}</h2>
        <h3 className='text-sm text-gray-400'>Welcome to Prismagram</h3>
      </div>
      <button
        onClick={async () => {
          await logout({
            onCompleted: () => {
              router.push('/login');
            },
          });
          await client.resetStore();
        }}
        className='text-sm font-bold text-blue-400'
      >
        Sign out
      </button>
    </div>
  );
};

export default MiniProfile;
