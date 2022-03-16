import {
  BookmarkIcon,
  ChatIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { LoaderIcon } from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { editPostModalState } from '../../atoms/editPostState';
import { userState } from '../../atoms/userState';
import {
  GetPostsDocument,
  GetPostsQuery,
  Post,
  useToggleLikeMutation,
} from '../../generated/graphql';
import { IUser } from '../../lib/types';
import { refreshData } from '../../utils';
import LikeBtn from '../LikeBtn';
import Carousel from './Carouseel';
import PostHeader from './PostHeader';

interface Props {
  data: Post;
}

const PostCard = ({ data }: Props) => {
  // console.log('postcard', data.likes);
  const router = useRouter();
  const [isLike, setIsLike] = useState(false);
  const [viewer, setViewer] = useRecoilState<IUser>(userState);
  const [toggleLike, { loading, error }] = useToggleLikeMutation({
    onCompleted: () => {
      // refreshData(router);
    },
  });

  useEffect(() => {
    if (data.likes.find((like) => like.userId === viewer?.id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [data.likes]);

  const handleLike = async () => {
    await toggleLike({
      variables: {
        postId: data.id,
      },
      refetchQueries: () => [{ query: GetPostsDocument }],
    });
    setIsLike(true);
  };
  const handleUnLike = async () => {
    await toggleLike({
      variables: {
        postId: data.id,
      },
      refetchQueries: () => [{ query: GetPostsDocument }],
      // update: (cache, { data }) => {
      //   console.log(cache);
      //   const postsData = cache.readQuery({
      //     query: GetPostsDocument,
      //   });
      // },
    });
    setIsLike(false);
  };
  return (
    <div className='relative my-7 rounded-sm bg-white dark:border dark:border-gray-400 dark:bg-black'>
      {/* {editPostModal && <EditPostModal user={data?.Me} />} */}
      <PostHeader data={data} />
      {data.images.length > 1 ? (
        <Carousel images={data.images} />
      ) : (
        <img className='w-full' src={data.images[0]} alt='' />
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
      <p className='truncate px-4 dark:text-white'>
        <p className='mb-1 mr-2 text-sm font-semibold'>
          {data.likes.length} likes
        </p>
        <span className='mr-1 text-sm font-semibold'>
          {data?.user.username}
        </span>{' '}
        {data.caption}
      </p>
      <div className='mb-1 cursor-pointer px-4 text-sm text-gray-400 dark:text-white'>
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
        <EmojiHappyIcon className='mr-2 h-7 cursor-pointer dark:text-white' />
        <input
          type='text'
          placeholder='Add a comment...'
          className='flex-1 border-none outline-none focus:ring-0 dark:bg-black dark:text-white'
        />
        <button className='font-semibold text-blue-400'>Post</button>
      </form>
    </div>
  );
};

export default PostCard;
