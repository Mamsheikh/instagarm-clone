import React from 'react';
import Image from 'next/image';
import { ChatIcon, HeartIcon } from '@heroicons/react/solid';
import { FaRegCommentDots } from 'react-icons/fa';
const PostCard = ({ image }) => {
  return (
    <div className='h-64 overflow-hidden'>
      <div className='relative h-64'>
        <Image
          objectFit='cover'
          layout='fill'
          src={image}
          alt=''
          className='h-64 w-full object-cover'
        />
      </div>
      <div className='absolute top-0 left-1/2 flex h-full w-full -translate-x-1/2 items-center justify-center space-x-3 bg-black-rgba text-white opacity-0 group-hover:opacity-100'>
        <div className='space-x-1'>
          <HeartIcon className=' inline h-6 w-6' />
          <span>3</span>
        </div>
        <div className='mr-2 space-x-1'>
          <ChatIcon className='inline h-5 w-5 scale-x-[-1]' />
          <span>6</span>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default PostCard;
