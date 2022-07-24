import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../atoms/userState';
import { useFollowMutation, useUnfollowMutation } from '../generated/graphql';
import { IUser } from '../lib/types';

interface Props {
  user: IUser;
  // userr: IUser
}

const FollowBtn = ({ user }: Props) => {
  const router = useRouter();
  const viewer = useRecoilValue<IUser>(userState);
  const [followed, setFollowed] = useState(false);
  const [follow] = useFollowMutation({
    onCompleted: () => {
      refreshData();
    },
  });
  const [unFollow] = useUnfollowMutation({
    onCompleted: () => {
      refreshData();
    },
  });

  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    if (viewer?.following.find((item) => item.id === user.id)) {
      setFollowed(true);
    }
    return () => setFollowed(false);
  }, [user.following, user.id]);

  const handleFollow = () => {
    follow({
      variables: {
        followId: user.id,
      },
    });
    setFollowed(true);
  };
  const handleUnFollow = () => {
    unFollow({
      variables: {
        unfollowId: user.id,
      },
    });
    setFollowed(false);
  };
  return (
    <>
      {followed ? (
        <button
          onClick={handleUnFollow}
          className='rounded bg-red-400 px-5 py-1 text-white'
        >
          Unfollow
        </button>
      ) : (
        <button
          onClick={handleFollow}
          className='rounded bg-blue-500 px-5 py-1 text-white'
        >
          Follow
        </button>
      )}
    </>
  );
};

export default FollowBtn;
