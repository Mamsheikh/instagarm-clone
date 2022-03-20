import React from 'react';

const UserCard = ({ user }) => {
  return (
    <>
      <div className=' flex items-center p-3'>
        <div>
          <img
            src={user.image}
            alt=''
            className='h-12 w-12 rounded-full object-cover'
          />
        </div>
        <div className='ml-3 flex flex-col'>
          <span className='text-md font-semibold text-gray-600'>
            {user.username}
          </span>
          <span className='text-sm text-gray-400'>{user.name}</span>
        </div>
      </div>
    </>
  );
};

export default UserCard;
