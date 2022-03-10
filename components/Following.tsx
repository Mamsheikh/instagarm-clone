import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  followersState,
  followingState,
  modalState,
} from '../atoms/modalState';
import { IUser } from '../lib/types';
import UserCard from './UserCard';

interface Props {
  users: IUser[];
}
const Following = ({ users }: Props) => {
  const [showFollowing, setShowFollowing] = useRecoilState(followingState);
  //   console.log('following', users);
  return (
    <Dialog
      open={showFollowing}
      onClose={() => setShowFollowing(false)}
      className='fixed inset-0 z-50 flex justify-center'
    >
      <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-70' />
      <div className='relative mx-4 mt-[10vh] max-h-[65vh] w-full max-w-sm rounded bg-white dark:bg-black '>
        <div className='flex items-center justify-end px-4 py-3'>
          <XIcon
            className=' h-6 w-6 cursor-pointer dark:text-white'
            onClick={() => setShowFollowing(!showFollowing)}
          />
        </div>
        <div>
          <span className='flex items-center justify-center text-3xl dark:text-white'>
            Followings
          </span>
        </div>
        <div className='mx-auto p-4'>
          {users.map((user) => (
            <UserCard user={user} key={user.id} />
          ))}
        </div>
      </div>
    </Dialog>
  );
};

export default Following;
