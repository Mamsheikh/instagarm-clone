import { Menu } from '@headlessui/react';
import { DotsHorizontalIcon } from '@heroicons/react/outline';
import React from 'react';
import { useRecoilState } from 'recoil';
import { postActionsState } from '../../atoms/postActionState';

const PostActionsModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(postActionsState);
  return (
    <Menu>
      <Menu.Button onClick={() => setIsOpen(!isOpen)}>
        <DotsHorizontalIcon className='h-5 w-5' />
      </Menu.Button>
      <Menu.Items>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && 'bg-blue-500'}`}
              href='/account-settings'
            >
              Account settings
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && 'bg-blue-500'}`}
              href='/account-settings'
            >
              Documentation
            </a>
          )}
        </Menu.Item>
        <Menu.Item disabled>
          <span className='opacity-75'>Invite a friend (coming soon!)</span>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default PostActionsModal;
