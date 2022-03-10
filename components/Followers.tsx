import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { followersState, modalState } from '../atoms/modalState';
import { IUser } from '../lib/types';
import UserCard from './UserCard';

interface Props {
  users: IUser[];
}

const Followers = ({ users }: Props) => {
  //   console.log('followers', users);
  const [showFollowers, setShowFollowers] = useRecoilState(followersState);
  return (
    <Dialog
      open={showFollowers}
      onClose={() => setShowFollowers(false)}
      className='fixed inset-0 z-50 flex justify-center'
    >
      <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-70' />
      <div className='relative mx-4 mt-[10vh] max-h-[65vh] w-full max-w-sm overflow-hidden overflow-y-auto rounded bg-white dark:bg-black '>
        <div className='flex items-center justify-end px-4 py-3'>
          <XIcon
            className=' h-6 w-6 cursor-pointer dark:text-white'
            onClick={() => setShowFollowers(!showFollowers)}
          />
        </div>
        <div>
          <span className='flex items-center justify-center text-3xl dark:text-white'>
            Followers
          </span>
        </div>
        <div className='mx-auto overflow-hidden overflow-y-auto p-4'>
          {users && users.map((user) => <UserCard user={user} key={user.id} />)}
          {users.length === 0 && (
            <h2 className='text-center font-semibold'>Nothing to show 🙄</h2>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default Followers;
