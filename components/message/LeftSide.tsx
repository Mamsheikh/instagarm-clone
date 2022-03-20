import React, { useState } from 'react';
import { useSearchUserLazyQuery } from '../../generated/graphql';
import UserCard from './UserCard';

const LeftSide = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [searchUser, { data, loading, error }] = useSearchUserLazyQuery();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      return setUsers([]);
    }
    try {
      searchUser({ variables: { input: search } });
      setUsers(data.searchUser);
    } catch (error) {}
  };
  const handleAddUser = (user) => {
    setSearch('');
    setUsers([]);
    localStorage.setItem(user, user);
    console.log(user);
  };
  return (
    <div className='border-r'>
      <form onSubmit={onSubmit} className='w-full'>
        <input
          className='w-full p-2 outline-none'
          type='text'
          value={search}
          placeholder='Search User'
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit' className='hidden bg-blue-500 p-2 text-white'>
          Search
        </button>
      </form>
      {users.length !== 0 ? (
        <>
          {users.map((user) => (
            <div
              className='cursor-pointer'
              key={user.id}
              onClick={() => handleAddUser(user)}
            >
              <UserCard user={user} />
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default LeftSide;
