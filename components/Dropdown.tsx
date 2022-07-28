import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useLogoutMutationMutation, User } from '../generated/graphql';
import { IUser } from '../lib/types';

interface DropdownProps {
  image?: string;
  id: string;
}

const Dropdown: React.FC<DropdownProps> = ({ image, id }) => {
  const router = useRouter();
  const [logout, { client }] = useLogoutMutationMutation();
  return (
    <div>
      <Menu as='div' className='relative'>
        <Menu.Button>
          {image ? (
            <img
              src={image}
              className='h-8 w-8 rounded-full object-cover'
              alt=''
            />
          ) : (
            <FaUserCircle className='navBtn' />
          )}
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 mt-2 w-32  origin-top-right rounded-md border bg-white shadow-lg dark:bg-black'>
              <Menu.Item>
                {({ active }) => (
                  <Link href={`/u/${id}`}>
                    <a
                      className={`${
                        active ? 'bg-gray-100 ' : ''
                      } block px-3 py-2 text-gray-700 hover:bg-gray-200 dark:text-white `}
                    >
                      Profile
                    </a>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                <a
                  onClick={async () => {
                    await logout({
                      onCompleted: () => {
                        router.push('/login');
                      },
                    });
                    await client.resetStore();
                  }}
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white'
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
