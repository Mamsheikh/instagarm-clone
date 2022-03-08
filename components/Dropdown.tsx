import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const Dropdown = ({ user }) => {
  return (
    <div>
      <Menu as='div' className='relative'>
        <Menu.Button>
          <img
            src={user?.image}
            className='h-8 w-8 rounded-full object-cover'
            alt=''
          />
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 mt-2 w-32  origin-top-right rounded-md border bg-white shadow-lg'>
              <Menu.Item>
                {({ active }) => (
                  <Link href={`/profile/${user.id}`}>
                    <a
                      className={`${
                        active ? 'bg-gray-100 ' : ''
                      } block px-3 py-2 text-gray-700 hover:bg-gray-200 `}
                    >
                      Profile
                    </a>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                <a
                  onClick={() => signOut()}
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                >
                  Logout
                </a>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu.Button>
      </Menu>
    </div>
  );
};

export default Dropdown;
