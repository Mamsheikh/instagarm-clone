import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import prisma from '../../lib/prisma';
// import { Post } from '../../generated/graphql';
import { DotsHorizontalIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import AddComment from '../../components/home/AddComment';
import LikeBtn from '../../components/LikeBtn';
import Layout from '../../components/Layout';
import Slider from '../../components/home/ImageSlider';
import PostActionsModal from '../../components/home/PostActionsModal';
import EditPostModal from '../../components/EditPostModal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { editPostModalState } from '../../atoms/editPostState';
import moment from 'moment';
import { Post } from '../../lib/types';

interface Props {
  post: Post;
  // userr: IUser
}
const Post = ({ post }: Props) => {
  console.log({ post });
  const [open, setOpen] = useState(false);
  const [editPost, setEditPost] = useRecoilState(editPostModalState);
  const [coment, setComent] = useState();

  return (
    <Layout>
      <div className=' mx-auto overflow-y-auto p-10 pt-20 scrollbar scrollbar-thumb-black dark:text-white md:mx-5 md:max-w-4xl xl:mx-auto'>
        <div className='relative mb-10 flex h-full flex-col bg-white dark:bg-gray-900'>
          {/* header */}
          <header className='static top-0 right-0 flex h-20 items-center justify-between border-b border-gray-300 px-3 md:absolute md:w-80 md:border-l'>
            <div className='flex items-center'>
              <Link href={`/u/${post.user.id}`}>
                <a className='flex items-center'>
                  <img
                    className='h-10 w-10 cursor-pointer rounded-full'
                    src={post.user.image}
                  />
                  <span className='ml-2 font-semibold'>
                    {post.user.username}
                  </span>
                </a>
              </Link>
            </div>

            <DotsHorizontalIcon
              className='h-5 w-5 cursor-pointer'
              onClick={() => setOpen(!open)}
            />
            {open && (
              <PostActionsModal
                post={post}
                open={open}
                setOpen={setOpen}
                editPost={editPost}
                setEditPost={setEditPost}
              />
            )}
            {editPost && (
              <EditPostModal
                editPost={editPost}
                post={post}
                setEditPost={setEditPost}
              />
            )}
          </header>
          {/* Media */}
          <div className='flex max-w-xl flex-1 flex-col justify-center bg-gray-800 md:mr-80 md:h-full'>
            {post.images.length > 1 ? (
              <Slider
                publicId={post.publicId}
                id={post.id}
                images={post.images}
              />
            ) : (
              <Link href={`/p/${post.id}`}>
                <img
                  loading='lazy'
                  className='mr-0 w-full   md:h-full md:object-cover'
                  src={post.images[0]}
                  alt={post.caption}
                />
              </Link>
            )}
          </div>
          <div className='static bottom-0 right-0 top-20 flex flex-col justify-between md:absolute md:w-80 md:border-l md:border-gray-300'>
            <div className='flex h-full flex-col justify-between'>
              <div className='md:min-h-48 overflow-y-auto px-3'>
                {/* Post Caption */}
                <div className='mb-3 flex border-b py-2'>
                  <Link href={`/u/${post.user.id}`}>
                    <a className='mr-2 font-semibold '>
                      <img
                        className='my-2 h-10 w-10 cursor-pointer rounded-full object-cover ring-2 ring-red-500'
                        src={post.user.image}
                      />
                    </a>
                  </Link>
                  <div className='mt-2 flex flex-col'>
                    <div>
                      <Link href={`/u/${post.user.id}`}>
                        <a className='mr-1 inline-block font-semibold hover:underline'>
                          {post.user.username}
                        </a>
                      </Link>
                      <span>{post.caption}</span>
                    </div>
                    <span className='mt-2 text-sm uppercase text-gray-400'>
                      {moment(post.createdAt).fromNow(true)} ago
                    </span>
                  </div>
                </div>

                {/* Comments */}
                <div className='comments-container my-1'>
                  {post.comments.map((comment) => (
                    <div key={comment?.id} className='mt-2 flex'>
                      <Link href={`/u/${comment?.user?.id}`}>
                        <a className='mr-2 font-semibold '>
                          {/* {comment?.user.} */}
                          <img
                            className='h-10 w-10 cursor-pointer rounded-full'
                            src={comment?.user?.image}
                          />
                        </a>
                      </Link>
                      <div className='flex flex-col'>
                        <div className='flex space-x-1'>
                          <Link href={`/u/${comment?.user?.id}`}>
                            <a className='flex font-semibold hover:underline'>
                              {comment?.user?.username}
                            </a>
                          </Link>
                          <span>{comment?.content}</span>
                        </div>
                        <span className='mt-2 text-sm text-gray-400'>
                          {moment(post.createdAt).fromNow(true)} ago
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Like And Comment Button */}
              <div>
                {/* <PostActions
              className='p-3'
              postId={id}
              addCommentRef={addCommentRef}
              userLike={userLike}
            />
            {/* Like Count */}
                <LikeBtn isLike={true} />
                <p className='px-3 font-semibold'>
                  {post.likes.length} like{post.likes.length === 1 ? '' : 's'}
                </p>
                {/* TimeStamp */}
                <Link href={`/p/${post.id}`}>
                  <a className='px-3 py-1 text-xs uppercase text-gray-500'>
                    {moment(post.createdAt).fromNow(true)} ago
                  </a>
                </Link>
                <AddComment postId={post.id} />
              </div>
            </div>
          </div>
        </div>
        {/* <section className='mt-10 border-t pt-10'>
        <h3 className='mb-3 font-bold text-gray-500'>
          More posts from
          <Link href={`/u/${post.user.id}`}>
            <a className='ml-1 font-semibold text-black hover:underline'>
              {post.user.username}
            </a>
          </Link>
        </h3>
        {post.user.posts.map((post) => {
          <PostCard post={post} key={post.id} />;
        })}
      </section> */}
      </div>
    </Layout>
  );
};

export default Post;
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await prisma.post.findUnique({
    where: { id: params.id as string },
    include: {
      likes: true,
      user: { include: { posts: true } },
      comments: { include: { user: true } },
    },
  });
  const post = JSON.parse(JSON.stringify(data));
  return {
    props: {
      post,
    },
  };
};
