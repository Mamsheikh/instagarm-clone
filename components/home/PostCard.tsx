import {
  BookmarkIcon,
  ChatIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline';
import React from 'react';
import { Post } from '../../generated/graphql';
import Carousel from './Carousel';
import PostBody from './PostBody';
import PostHeader from './PostHeader';

interface Props {
  data: Post;
}

const PostCard = ({ data }) => {
  //   console.log('user', data?.user);
  return (
    <div className='my-7 rounded-sm bg-white'>
      <PostHeader data={data} />
      {data.images.length > 1 ? (
        <Carousel images={data.images} />
      ) : (
        <img className='w-full' src={data.images[0]} alt='' />
      )}
      <div className='flex justify-between p-4'>
        <div className='flex space-x-4 '>
          <HeartIcon className='postBtn' />
          <ChatIcon className='postBtn' />
          <PaperAirplaneIcon className='postBtn' />
        </div>
        <BookmarkIcon className='postBtn' />
      </div>
    </div>
  );
};

export default PostCard;
