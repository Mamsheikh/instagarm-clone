import { HeartIcon } from '@heroicons/react/solid';
import { HeartIcon as HertIcon } from '@heroicons/react/outline';
import React from 'react';
import { useToggleLikeMutation } from '../generated/graphql';
import { LoaderIcon } from 'react-hot-toast';

interface LikeBtnProps {
  isLike: boolean;
  handleLike: () => void;
  handleUnLike: () => void;
  loading?: boolean;
}

const LikeBtn: React.FC<LikeBtnProps> = ({
  isLike,
  handleLike,
  handleUnLike,
  loading,
}) => {
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
