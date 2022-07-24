import { DotsHorizontalIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import PostActionsModal from './PostActionsModal';

const PostHeader = ({ data }) => {
  return (
    <div className='relative'>
      <div className=' flex items-center p-4'>
        <div>
          <Link href={`/u/${data?.user?.id}`}>
            <a>
              {data.user?.image ? (
                <img
                  src={data?.user?.image}
                  alt='post image'
                  className='h-10 w-10 rounded-full object-cover'
                />
              ) : (
                <FaUserCircle className='h-6 w-6 text-gray-600' />
              )}
            </a>
          </Link>
        </div>
        {/* <
            <a> */}
        <p className='ml-4 flex-1 text-sm font-semibold dark:text-white'>
          <Link href={`/u/${data?.user?.id}`}>{data?.user?.username}</Link>
        </p>
        {/* </a>
         */}
        {/* <DotsHorizontalIcon className='h-5 w-5' /> */}
        <PostActionsModal user={data} />
      </div>
    </div>
  );
};

export default PostHeader;
