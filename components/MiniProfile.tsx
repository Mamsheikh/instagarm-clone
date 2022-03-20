import { signOut } from 'next-auth/react';
import image from 'next/image';
import React from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../atoms/userState';

const MiniProfile = () => {
  const [viewer, setViewer] = useRecoilState(userState);
  return (
    <div className='mt-10 ml-10 flex items-center justify-center'>
      <div className=' rounded-full object-cover'>
        <img
          className='h-12 w-12 rounded-full'
          src={viewer?.image}
          alt='profile'
        />
      </div>
      <div className='mx-4 flex-1'>
        <h2 className='font-bold dark:text-gray-300'>{viewer?.username}</h2>
        <h3 className='text-sm text-gray-400'>Welcome to Prismagram</h3>
      </div>
      <button
        onClick={() => signOut()}
        className='text-sm font-bold text-blue-400'
      >
        Sign out
      </button>
    </div>
  );
};

export default MiniProfile;
