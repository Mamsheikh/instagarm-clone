import {
  BookmarkIcon,
  ChatIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline';
import React from 'react';
import { useRecoilState } from 'recoil';
import { editPostModalState } from '../../atoms/editPostState';
import { Post } from '../../generated/graphql';
import EditPostModal from '../EditPostModal';
import Carousel from './Carouseel';
import PostBody from './PostBody';
import PostHeader from './PostHeader';

interface Props {
  data: Post;
}

const PostCard = ({ data }) => {
  // console.log('user', data.id);
  const [editPostModal, setEditPostModal] = useRecoilState(editPostModalState);
  return (
    <div className='relative my-7 rounded-sm bg-white'>
      {/* {editPostModal && <EditPostModal user={data?.Me} />} */}
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
      <p className='truncate px-4'>
        <p className='mb-1 text-sm font-semibold'>23 likes</p>
        <span className='mr-1 text-sm font-semibold'>
          {data?.user.username}
        </span>{' '}
        {data.caption}
      </p>
      <div className='mb-1 cursor-pointer px-4 text-sm text-gray-400'>
        View all 14 comments
      </div>
      <div className='flex justify-between px-4'>
        <div>
          <span className='mr-1 text-sm font-semibold'>Alan</span>That's noice😅
        </div>
      </div>
      <div className='flex justify-between px-4'>
        <div>
          <span className='mr-1 text-sm font-semibold'>Elon</span>Cool 🌚
        </div>
      </div>
      <div className='mb-4 mt-2 px-4 text-xs uppercase text-gray-400'>
        2 days ago.
      </div>
      <hr />
      <form action='' className='flex items-center p-4'>
        <EmojiHappyIcon className='mr-2 h-7 cursor-pointer' />
        <input
          type='text'
          placeholder='Add a comment...'
          className='flex-1 border-none outline-none focus:ring-0'
        />
        <button className='font-semibold text-blue-400'>Post</button>
      </form>
    </div>
  );
};

export default PostCard;
