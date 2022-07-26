import { BookmarkIcon, DotsHorizontalIcon } from '@heroicons/react/outline';
import React from 'react';
import PostActionsModal from './PostActionsModal';

const PostSkeleton = () => {
  return (
    <div className='relative my-7 mx-auto max-w-lg rounded-sm bg-white dark:border dark:border-gray-400 dark:bg-black'>
      <div className='relative'>
        <div className=' flex items-center p-4'>
          <div>
            <div className='h-10 w-10 animate-pulse rounded-full bg-gray-300 object-cover' />
          </div>

          <p className='ml-4 flex-1 text-sm font-semibold dark:text-white'>
            <div className='h-4 w-20 animate-pulse rounded bg-gray-200'></div>
          </p>

          <DotsHorizontalIcon
            className='h-5 w-5 cursor-pointer'
            onClick={() => {}}
          />
        </div>
      </div>

      <div className='h-72 w-full animate-pulse cursor-pointer bg-gray-200 object-cover' />
      <div className=' flex items-center p-4'>
        <div className='flex items-center space-x-4'>
          <div className='h-8 w-8 animate-pulse rounded-full bg-gray-300 object-cover' />
          <div className='h-8 w-8 animate-pulse rounded-full bg-gray-300 object-cover' />
          <div className='h-8 w-8 animate-pulse rounded-full bg-gray-300 object-cover' />
        </div>

        <p className='ml-4 flex-1 text-sm font-semibold dark:text-white'>
          <div className='h-4 w-20 animate-pulse rounded bg-gray-200'></div>
        </p>

        <BookmarkIcon className='postBtn' />
      </div>
    </div>
  );
};

export default PostSkeleton;
