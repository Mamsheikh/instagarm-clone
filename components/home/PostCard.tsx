import {
  BookmarkIcon,
  ChatIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../atoms/userState';
import {
  GetPostsDocument,
  PostsDocument,
  useMeQuery,
  useToggleLikeMutation,
} from '../../generated/graphql';
import { IUser, Post } from '../../lib/types';
import LikeBtn from '../LikeBtn';
import AddComment from './AddComment';
import Slider from './ImageSlider';

import PostHeader from './PostHeader';

interface Props {
  post: Post;
}

const PostCard: React.FC<Props> = ({ post }) => {
  // console.log('postcard', data.likes);
  const router = useRouter();
  const { data } = useMeQuery({
    errorPolicy: 'ignore',
  });
  const [isLike, setIsLike] = useState(false);
  const [viewer, setViewer] = useRecoilState<IUser>(userState);
  const [toggleLike, { loading, error }] = useToggleLikeMutation({
    onCompleted: () => {
      // refreshData(router);
    },
  });

  useEffect(() => {
    if (post.likes.find((like) => like.userId === data?.me?.id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes]);

  const handleLike = async () => {
    await toggleLike({
      variables: {
        postId: post.id,
      },
      refetchQueries: () => [{ query: PostsDocument }],
    });
    setIsLike(true);
  };
  const handleUnLike = async () => {
    await toggleLike({
      variables: {
        postId: post.id,
      },
      refetchQueries: () => [{ query: PostsDocument }],
      // update: (cache, { post }) => {
      //   console.log(cache);
      //   const postsData = cache.readQuery({
      //     query: GetPostsDocument,
      //   });
      // },
    });
    setIsLike(false);
  };
  return (
    <div className='relative my-7 mx-auto max-w-lg rounded-sm bg-white dark:border dark:border-gray-400 dark:bg-black'>
      {/* {editPostModal && <EditPostModal user={data?.Me} />} */}
      <PostHeader post={post} />
      {post.images.length > 1 ? (
        <Slider id={post.id} images={post.images} publicId={post.publicId} />
      ) : (
        <Link href={`/p/${post.id}`}>
          <img
            className='h-72 w-full cursor-pointer object-cover'
            src={post.images[0]}
            alt=''
          />
        </Link>
      )}
      <div className='flex justify-between p-4'>
        <div className='flex space-x-4 '>
          {/* {loading ? ( */}
          {/* <LoaderIcon className='h-7' /> */}

          <LikeBtn
            loading={loading}
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
          {/* )} */}
          <ChatIcon className='postBtn' />
          <PaperAirplaneIcon className='postBtn' />
        </div>
        <BookmarkIcon className='postBtn' />
      </div>
      <div className='truncate px-4 dark:text-white'>
        <p className='mb-1 mr-2 text-sm font-semibold'>
          {post.likes.length} likes
        </p>
        <span className='mr-1 text-sm font-semibold'>
          {post?.user.username}
        </span>{' '}
        {post.caption}
      </div>
      <div className='mb-1 cursor-pointer px-4 text-sm text-gray-400 dark:text-white'>
        <Link href={`/p/${post.id}`}>
          <a>View all {post.comments.length} comments</a>
        </Link>
      </div>
      {post.comments.map((comment) => (
        <div
          key={comment.id}
          className='flex justify-between px-4 dark:text-gray-300'
        >
          <div>
            <span className='mr-1 text-sm font-semibold'>
              {comment.user.username}
            </span>
            {comment.content}
          </div>
        </div>
      ))}
      {/* <div className='flex justify-between px-4'>
        <div>
          <span className='mr-1 text-sm font-semibold'>Elon</span>Cool 🌚
        </div>
      </div> */}
      <div className='mb-4 mt-2 px-4 text-xs uppercase text-gray-400'>
        {moment(post.createdAt).fromNow(true)} ago
      </div>
      <hr />
      <AddComment postId={post.id} />
    </div>
  );
};

export default PostCard;
