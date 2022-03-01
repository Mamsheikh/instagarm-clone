import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { RiMessengerLine } from 'react-icons/ri';
import { AiOutlinePlusSquare, AiOutlineCompass } from 'react-icons/ai';
import { signIn, useSession } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [crossVisibility, setCrossVisibility] = useState(false);
  const inputAreaRef = useRef(null);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!inputAreaRef?.current?.contains(e.target)) {
        console.log('outside input area');
        setCrossVisibility(false);
        setSearchVisibility(true);
      } else {
        setCrossVisibility(true);
        setSearchVisibility(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.addEventListener('mousedown', checkIfClickedOutside);
    };
  }, []);

  return (
    <header className='fixed top-0 w-full border-b bg-white shadow-sm'>
      <div className='mx-5 flex max-w-6xl justify-between  p-2 xl:mx-auto'>
        <div className='relative hidden h-10 w-24 lg:inline-grid'>
          <Image
            src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
            layout='fill'
            objectFit='contain'
          />
        </div>
        <div className='relative mr-3 h-10 w-10 flex-shrink-0 lg:hidden'>
          <Image
            src='https://links.papareact.com/jjm'
            layout='fill'
            objectFit='contain'
          />
        </div>
        {/* Search Input TODO: */}
        <div
          ref={inputAreaRef}
          className='relative flex rounded-md border-[1.2px] border-solid border-gray-300 bg-gray-50 p-2 pl-2  sm:text-sm '
        >
          {searchVisibility && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-gray-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          )}
          <input
            type='text'
            placeholder='Search'
            className='block w-full bg-gray-50 pl-1 focus:outline-none'
          />
          {crossVisibility && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-gray-400'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                clipRule='evenodd'
              />
            </svg>
          )}
        </div>
        <div className='flex items-center justify-end space-x-4'>
          {/* HomeIcon */}

          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='navBtn'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
          </svg>
          {/* MenuIcon */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 md:hidden'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
              clipRule='evenodd'
            />
          </svg>
          {session ? (
            <>
              <div className='navBtn relative'>
                <RiMessengerLine className='navBtn' />
                <span className='absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs leading-none text-white'>
                  3
                </span>
              </div>
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
              <AiOutlinePlusSquare className='navBtn' />
              <AiOutlineCompass className='navBtn' />
              <div className='avatar'>
                <div className='-ml-2 h-8 w-8 rounded-full object-contain'>
                  <img src={session?.user?.image} />
                </div>
              </div>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className='rounded bg-blue-500 px-4 py-1 text-sm text-white'
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
