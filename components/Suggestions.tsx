import Link from 'next/link';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useGetFollowSuggestionsQuery } from '../generated/graphql';

const Suggestions = () => {
  const { data } = useGetFollowSuggestionsQuery();
  return (
    <div className='mt-4 ml-10'>
      <div className='mb-5 flex justify-between text-sm'>
        <h3 className='text-sm font-semibold text-gray-400'>Suggestions</h3>
        <button className='font-semibold text-gray-600'>See All</button>
      </div>
      {data?.getFollowSuggestions.map((user) => (
        <div key={user.id} className='mt-3 flex items-center justify-between'>
          <div>
            {user.image ? (
              <img
                src={user.image}
                alt='user'
                className='h-10 w-10 rounded-full'
              />
            ) : (
              <FaUserCircle className='h-10 w-10' />
            )}
          </div>
          <div className='ml-4 flex-1'>
            <h2 className='text-sm font-semibold'>{user.username}</h2>
            <h3 className='text-xs text-gray-400'>New to Prismagram</h3>
          </div>
          <div className='text-xs font-bold text-blue-400'>
            <Link href={`/u/${user.id}`}>View Profile</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
