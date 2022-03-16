import { HeartIcon } from '@heroicons/react/solid';
import { HeartIcon as HertIcon } from '@heroicons/react/outline';
import React from 'react';
import { useToggleLikeMutation } from '../generated/graphql';
import { LoaderIcon } from 'react-hot-toast';

const LikeBtn = ({ isLike, handleLike, handleUnLike, loading }) => {
  //   const [toggleLike, { loading, error }] = useToggleLikeMutation();
  return (
    <>
      {isLike ? (
        // loading && <LoaderIcon />
        <HeartIcon
          className='postBtn text-red-500 dark:text-red-500'
          onClick={handleUnLike}
        />
      ) : (
        // />
        <HertIcon className='postBtn' onClick={handleLike} />
      )}
    </>
  );
};

export default LikeBtn;
