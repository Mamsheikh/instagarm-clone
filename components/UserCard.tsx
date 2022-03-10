import Link from 'next/link';
import React from 'react';
import { useRecoilState } from 'recoil';
import { followersState } from '../atoms/modalState';

const UserCard = ({ user }) => {
  const [showFollowers, setShowFollowers] = useRecoilState(followersState);
  return (
    <div className='flex items-center justify-between space-y-4 overflow-hidden overflow-y-auto px-6'>
      <div className='flex items-center'>
        <div>
          <Link href={`/profile/${user.id}`}>
            <a className='' onClick={() => setShowFollowers(!showFollowers)}>
              <img
                src={user.image}
                alt=''
                className='h-9 w-9 rounded-full object-cover'
              />
            </a>
          </Link>
        </div>
        <div className='ml-4 flex flex-col'>
          <Link href={`/profile/${user.id}`}>
            <a className='font-semibold hover:underline'>{user.username}</a>
          </Link>
          <span className='flex-1 text-xs text-gray-500'>{user.name}</span>
        </div>
      </div>
      <div>
        <button className='border px-4 py-1 text-gray-600'>
          {showFollowers ? <span>Follower</span> : <span>Following</span>}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
