import { DotsHorizontalIcon } from '@heroicons/react/solid';
import React from 'react';
import PostActionsModal from './PostActionsModal';

const PostHeader = ({ data }) => {
  return (
    <div className=''>
      <div className='flex items-center p-4'>
        <div>
          <img
            src={data?.user?.image}
            alt='post image'
            className='h-10 w-10 rounded-full object-cover'
          />
        </div>
        <p className='ml-4 flex-1 text-sm font-semibold'>
          {data?.user?.username}
        </p>
        {/* <DotsHorizontalIcon className='h-5 w-5' /> */}
        <PostActionsModal />
      </div>
    </div>
  );
};

export default PostHeader;