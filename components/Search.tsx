import React, { useState, useEffect, useRef } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import SearchResults from './SearchResults';
import { ISearch } from '../lib/types';
import { User, useSearchUserLazyQuery } from '../generated/graphql';
import { spawn } from 'child_process';

interface IProps {
  data: [ISearch];
}

interface IUsers {
  users: [User];
}

const Search = () => {
  const [search, setSearch] = useState<string>('');
  const [users, setUsers] = useState<User[]>();
  const [showToolTip, setShowToolTip] = useState(false);
  const [searchVisibility, setSearchVisibility] = useState(false);
  const [crossVisibility, setCrossVisibility] = useState(false);
  const inputAreaRef = useRef(null);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!inputAreaRef?.current?.contains(e.target)) {
        // console.log('outside input area');
        setCrossVisibility(false);
        setSearchVisibility(true);
        setShowToolTip(false);
      } else {
        setCrossVisibility(true);
        setSearchVisibility(false);
        setShowToolTip(true);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.addEventListener('mousedown', checkIfClickedOutside);
    };
  }, []);

  const [searchUser, { data, loading, error }] = useSearchUserLazyQuery();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!search) return;
    try {
      searchUser({ variables: { input: search } });
      setUsers(data.searchUser);
      // console.log(data);
      // console.log('users', users);
    } catch (err) {
      console.log(err);
    }
  };

  const onClose = (e) => {
    setSearch('');
    setUsers([]);
    setShowToolTip(false);
  };

  return (
    <form
      onSubmit={onSubmit}
      ref={inputAreaRef}
      className='relative flex rounded-md border-[1.2px] border-solid border-gray-300 bg-gray-50 p-2 pl-2 dark:bg-black  sm:text-sm '
    >
      {/* <form onSubmit={onSubmit}> */}
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
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='block w-full  bg-gray-50 pl-1 focus:outline-none dark:bg-black'
      />
      {crossVisibility && (
        <>
          <svg
            onClick={() => setSearch('')}
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
          </svg>
          <button type='submit'>
            {' '}
            <svg
              // onClick={onSubmit}
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
          </button>
        </>
      )}
      {showToolTip && data && users && (
        <div className='search-tip absolute top-10 left-1/2 w-96 -translate-x-1/2 rounded-md bg-black p-5 text-white shadow-xl dark:bg-white'>
          <div className='mb-5 flex justify-between'>
            <h3 className='font-bold text-gray-800'>Results</h3>
            <button
              className='text-xs font-bold text-blue-400'
              onClick={onClose}
            >
              clear all
            </button>
            {loading && <span className='text-gray-800'>loading up</span>}
          </div>
          {users.length === 0 && (
            <h2 className='text-center font-bold text-gray-700'>
              No Results found
            </h2>
          )}
          {users.map((user) => (
            <SearchResults
              onClose={onClose}
              key={user.id}
              id={user.id}
              name={user.name}
              image={user.image}
            />
          ))}
        </div>
      )}
    </form>
  );
};

export default Search;
