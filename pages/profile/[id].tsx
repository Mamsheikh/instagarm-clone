import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { CogIcon, PlayIcon, BookmarkIcon } from '@heroicons/react/outline';
import { BiGridVertical } from 'react-icons/bi';
import { MdOutlineContactMail } from 'react-icons/md';
import PostCard from '../../components/PostCard';
import { images } from '../../data/images';
import prisma from '../../lib/prisma';
import { useRecoilState } from 'recoil';
import { IUser } from '../../lib/types';
import EditProfileModal from '../../components/EditProfileModal';
import {
  followersState,
  followingState,
  modalState,
} from '../../atoms/modalState';
import FollowBtn from '../../components/FollowBtn';
import toast from 'react-hot-toast';
import Followers from '../../components/Followers';
import Following from '../../components/Following';

interface Props {
  user: IUser;
  // userr: IUser
}
const Profile = ({ user }: Props) => {
  const posts = user.posts;
  // console.log(posts.images[0]);
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [showFollowers, setShowFollowers] = useRecoilState(followersState);
  const [showFollowing, setShowFollowing] = useRecoilState(followingState);
  const { data: session, status } = useSession();

  return (
    <div className='mx-5 max-w-6xl overflow-y-auto p-10 pt-20 scrollbar scrollbar-thumb-black dark:text-white xl:mx-auto'>
      <div className='grid grid-cols-4 gap-4'>
        <div className='flex justify-center sm:col-span-2 lg:col-span-1'>
          <img
            className='h-36 w-36 rounded-full object-cover'
            src={user.image}
            alt=''
          />
        </div>
        <div className='col-span-2'>
          <span className='mr-4 text-2xl text-gray-600 dark:text-white'>
            {!user.username
              ? toast.success('setup your profile')
              : user.username}
          </span>
          {user.email === session?.user?.email ? (
            <>
              <div className='mr-4 inline cursor-pointer rounded border border-gray-300 p-1 px-2 text-sm text-gray-700 dark:text-white'>
                <button onClick={() => setIsOpen(!isOpen)}>Edit Profile</button>
              </div>
              {isOpen && <EditProfileModal user={user} />}
              <CogIcon className='inline h-6 flex-1 cursor-pointer' />
            </>
          ) : (
            <FollowBtn user={user} />
          )}
          <div className='mt-4 flex'>
            <div>
              <span className='font-semibold'>{user?.posts.length}</span> posts
            </div>
            <div
              className='cursor-pointer hover:underline'
              onClick={() => setShowFollowers(true)}
            >
              <span className='ml-4 font-semibold'>
                {user?.followers.length}
              </span>{' '}
              followers
            </div>
            <div
              className='cursor-pointer hover:underline'
              onClick={() => setShowFollowing(!showFollowing)}
            >
              <span className='ml-4 font-semibold'>
                {user && user.following.length}
              </span>{' '}
              following
            </div>
          </div>
          <div>
            <div className='pt-3'>
              <span className='text-lg font-bold text-gray-700'>
                {user.bio}
              </span>
              <p className='mr-2 text-base text-blue-700'>
                #javascript #react #graphql
              </p>
              <a
                target='_blank'
                href='www.google.com'
                className='mr-2 text-base font-medium text-blue-700'
              >
                {user.website}
              </a>
            </div>
          </div>
        </div>
      </div>
      {showFollowers && <Followers users={user.followers} />}
      {showFollowing && <Following users={user.following} />}
      <hr className='mt-6 border-gray-500' />

      <div className='flex justify-center gap-10'>
        <button className='flex gap-1 border-gray-800 py-4 text-sm font-semibold uppercase text-gray-400 focus:border-t focus:text-gray-600'>
          <BiGridVertical className='h-5 w-5 items-center' /> POSTS
        </button>
        <button className='flex gap-1 border-gray-800 py-4 text-sm font-semibold uppercase text-gray-400 focus:border-t focus:text-gray-600'>
          <PlayIcon className='h-5 w-5 items-center' /> Videos
        </button>
        <button className='flex gap-1 border-gray-800 py-4 text-sm font-semibold uppercase text-gray-400 focus:border-t focus:text-gray-600'>
          <BookmarkIcon className='h-5 w-5 items-center' /> Saved
        </button>
        <button className='flex gap-1 border-gray-800 py-4 text-sm font-semibold uppercase text-gray-400 focus:border-t focus:text-gray-600'>
          <MdOutlineContactMail className='h-5 w-5 items-center' /> Tagged
        </button>
      </div>
      <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
        {posts.map((post) => (
          <div key={post.id} className='group relative cursor-pointer'>
            <PostCard post={post} />
            {/* <div>{post.images[0]}</div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await prisma.user.findUnique({
    where: { id: params.id as string },
    include: { posts: true, followers: true, following: true },
  });
  const user = JSON.parse(JSON.stringify(data));
  return {
    props: {
      user,
    },
  };
};
