import Link from 'next/link';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { User, useSearchUserLazyQuery } from '../generated/graphql';
// import { Users } from '../lib/types';

interface IProps {
  data: [User];
}

const SearchResults = ({ name, image, id, onClose, username }) => {
  // console.log('searchResults', data);
  return (
    <div className='mt-4 flex items-center justify-between'>
      {/* {data && */}
      {/* // data.map((user) => { */}
      <div className='flex items-center'>
        <Link href={`/u/${id}`}>
          <a className='flex items-center' onClick={onClose}>
            {image ? (
              <div className='avatar'>
                <div className='h-14 w-14 rounded-full'>
                  <img src={image} alt='' />
                </div>
              </div>
            ) : (
              <FaUserCircle className='h-14 w-14' />
            )}
            <div className='pl-4'>
              <div className='text-md font-bold text-gray-800'>{name}</div>
              <div className='text-gray-400'>{username}</div>
            </div>
          </a>
        </Link>
      </div>
      {/* <svg
        // onClick={}
        xmlns='http://www.w3.org/2000/svg'
        className='h-5 w-5 cursor-pointer text-gray-400'
        viewBox='0 0 20 20'
        fill='currentColor'
      >
        <path
          fillRule='evenodd'
          d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
          clipRule='evenodd'
        />
      </svg> */}
    </div>
  );
};

export default SearchResults;
