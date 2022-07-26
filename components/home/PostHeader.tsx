import { DotsHorizontalIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import EditPostModal from '../EditPostModal';
import PostActionsModal from './PostActionsModal';

const PostHeader = ({ post }) => {
  const [open, setOpen] = useState(false);
  const [editPost, setEditPost] = useState(false);
  return (
    <div className='relative'>
      <div className=' flex items-center p-4'>
        <div>
          <Link href={`/u/${post?.user?.id}`}>
            <a>
              {post.user?.image ? (
                <img
                  src={post?.user?.image}
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
          <Link href={`/u/${post?.user?.id}`}>{post?.user?.username}</Link>
        </p>
        {/* </a>
         */}
        <DotsHorizontalIcon
          className='h-5 w-5 cursor-pointer'
          onClick={() => setOpen(!open)}
        />
        {open && (
          <PostActionsModal
            setEditPost={setEditPost}
            editPost={editPost}
            open={open}
            post={post}
            setOpen={setOpen}
          />
        )}
        {editPost && (
          <EditPostModal
            editPost={editPost}
            post={post}
            setEditPost={setEditPost}
          />
        )}
      </div>
    </div>
  );
};

export default PostHeader;
