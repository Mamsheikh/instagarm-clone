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
import { getSession } from 'next-auth/react';
import { IUser } from '../../lib/types';

interface Props {
  user: IUser;
  // userr: IUser
}
const Profile = ({ user }: Props) => {
  const { data: session, status } = useSession();
  // console.log(session.user.id);
  const router = useRouter();
  const { id } = router.query;
  // console.log(user);
  // const postcount = user.posts.co;
  // const [images, setImages] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const {
  //       data: { results },
  //     } = await axios.get(
  //       `https://api.unsplash.com/search/photos?page=1&query=office&client_id=${process.env.NEXT_PUBLIC_client_id}`
  //     );
  //     const edited_result = results.map((item) => item.links.download);
  //     setImages(edited_result);
  //     console.log(edited_result);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className='mx-5 max-w-6xl overflow-y-auto p-10 pt-20 scrollbar scrollbar-thumb-black dark:text-white xl:mx-auto'>
      <div className='grid grid-cols-4 gap-4'>
        <div className='flex justify-center sm:col-span-2 lg:col-span-1'>
          <img
            className='h-36 w-36 rounded-full'
            src='https://lh3.googleusercontent.com/a/AATXAJwmuHYQfsGUjfjgUy8ZJsajaL15cDti2b6tmZ2a=s96-c'
            alt=''
          />
        </div>
        <div className='col-span-2'>
          <span className='mr-4 text-2xl text-gray-600'>Mamsheikh</span>
          {user.email === session?.user?.email ? (
            <>
              <div className='mr-4 inline cursor-pointer rounded border border-gray-300 p-1 px-2 text-sm text-gray-700'>
                <button>Edit Profile</button>
              </div>
              <CogIcon className='inline h-6 flex-1 cursor-pointer' />
            </>
          ) : null}
          <div className='mt-4 flex'>
            <div>
              <span className='font-semibold'>{user?.posts.length}</span> posts
            </div>
            <div>
              <span className='ml-4 font-semibold'>
                {user?.followedBy.length}
              </span>{' '}
              followers
            </div>
            <div>
              <span className='ml-4 font-semibold'>
                {user && user.following.length}
              </span>{' '}
              following
            </div>
          </div>
          <div>
            <div className='pt-3'>
              <span className='text-lg font-bold text-gray-700'>
                This is my bio
              </span>
              <p className='mr-2 text-base text-blue-700'>
                #javascript #react #graphql
              </p>
              <a
                target='_blank'
                href='www.google.com'
                className='mr-2 text-base font-medium text-blue-700'
              >
                google.com
              </a>
            </div>
          </div>
        </div>
      </div>
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
        {images.map((image) => (
          <div className='group relative cursor-pointer'>
            <PostCard key={1} image={image} />
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
  // const { data: session, status } = useSession();
  // const userr = await prisma.user.findUnique({
  //   where: {email: session.user.email}
  // })
  const user = await prisma.user.findUnique({
    where: { id: params.id as string },
    include: { posts: true, followedBy: true, following: true },
  });

  return {
    props: {
      user,
    },
  };
};
