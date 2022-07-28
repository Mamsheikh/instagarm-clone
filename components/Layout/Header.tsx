import {
  HomeIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/outline';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect } from 'react';
import { AiOutlineCompass, AiOutlinePlusSquare } from 'react-icons/ai';
import { BsInstagram } from 'react-icons/bs';
import { RiMessengerLine } from 'react-icons/ri';
import { useRecoilState } from 'recoil';
import { postState } from '../../atoms/addPostState';
import { userState } from '../../atoms/userState';
import { useMeQuery } from '../../generated/graphql';
import AddPostModal from '../AddPostModal';
import Dropdown from '../Dropdown';
import Search from '../Search';

const Header = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [addPost, setAddPost] = useRecoilState(postState);

  const { data } = useMeQuery({
    errorPolicy: 'ignore',
  });

  const [viewer, setViewer] = useRecoilState(userState);

  useEffect(() => {
    if (data) {
      setViewer(data.me);
    }
  }, [data]);

  return (
    <header className='fixed top-0 z-50 w-full border-b bg-white shadow-sm dark:bg-black'>
      <div className='mx-5 flex max-w-4xl justify-between p-2  text-black xl:mx-auto'>
        <div className='relative hidden h-10 w-24 lg:inline-grid'>
          <Link href='/'>
            <h2
              className='cursor-pointer text-gray-800 dark:text-white'
              style={{ fontFamily: 'Grand Hotel', fontSize: '2rem' }}
            >
              Prismagram
            </h2>
          </Link>
        </div>
        <div className='relative mr-3 h-10 w-10 flex-shrink-0 lg:hidden'>
          {/* <Image
            src='https://links.papareact.com/jjm'
            layout='fill'
            objectFit='contain'
          /> /*/}
          <Link href='/'>
            <a>
              <BsInstagram
                className='cursor-pointer  dark:text-white'
                size={32}
              />
            </a>
          </Link>
        </div>
        {/* Search Input TODO: */}
        <Search />
        <div className='flex items-center justify-end space-x-4'>
          <Link href='/'>
            <a>
              <HomeIcon className='navBtn' />
            </a>
          </Link>

          <MenuIcon className='h-6 md:hidden' />
          <div onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'light' ? (
              // <MoonIcon className='navBtn' />
              <span>
                <MoonIcon className='navBtn' />
              </span>
            ) : (
              <span>
                {/* <SunIcon /> */}
                <SunIcon className='navBtn' />
              </span>
            )}
          </div>
          {data?.me ? (
            <>
              {/* <div className='navBtn relative'>
                <Link href='/message'>
                  <a>
                    <RiMessengerLine className='navBtn' />
                    <span className='absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs leading-none text-white'>
                      3
                    </span>
                  </a>
                </Link>
              </div> */}
              <div className=' relative'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='navBtn'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  />
                </svg>
                {/* <div className='navBtn absolute left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-red-500'></div> */}
              </div>
              <AiOutlinePlusSquare
                onClick={() => setAddPost(!addPost)}
                className='navBtn'
              />
              <Link href='/explore'>
                <a>
                  <AiOutlineCompass className='navBtn' />
                </a>
              </Link>

              <Dropdown id={data?.me?.id} image={data?.me?.image} />
              {addPost && <AddPostModal user={data?.me} />}
            </>
          ) : (
            <Link href='/login'>
              <a className='rounded bg-blue-500 px-4 py-1 text-sm text-white'>
                Login
              </a>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
