import { Menu } from '@headlessui/react';
import {
  DocumentDuplicateIcon,
  DotsHorizontalIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import React from 'react';
import { useRecoilState } from 'recoil';
import { postState } from '../../atoms/addPostState';
import { editPostModalState, editPostState } from '../../atoms/editPostState';
import { postActionsState } from '../../atoms/postActionState';
import { userState } from '../../atoms/userState';
import { IUser } from '../../lib/types';
import EditPostModal from '../EditPostModal';

const PostActionsModal = ({ user }) => {
  // console.log('post', user);
  const [isOpen, setIsOpen] = useRecoilState(postActionsState);
  const [editPost, setEditPost] = useRecoilState(editPostState);
  const [editPostModal, setEditPostModal] = useRecoilState(editPostModalState);
  const [viewer, setViewer] = useRecoilState<IUser>(userState);
  const [addPost, setAddPost] = useRecoilState(postState);

  const onEditPost = () => {
    setEditPostModal(!editPostModal);
    setEditPost(user);
  };
  return (
    <div className=' w-56 overflow-visible object-top text-right'>
      <Menu as='div' className=''>
        <Menu.Button onClick={() => setIsOpen(!isOpen)}>
          <DotsHorizontalIcon className=' h-5 w-5 dark:text-white' />
        </Menu.Button>
        <Menu.Items className='absolute right-10 bottom-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-gray-600 dark:bg-black'>
          <div className='px-1 py-1 '>
            {viewer?.id === user.user.id && (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={onEditPost}
                      className={`${
                        active
                          ? 'bg-violet-500 text-white dark:text-black'
                          : 'text-gray-900 dark:text-white'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <PencilIcon
                          className='mr-2 h-5 w-5'
                          aria-hidden='true'
                        />
                      ) : (
                        <PencilIcon
                          className='mr-2 h-5 w-5'
                          aria-hidden='true'
                        />
                      )}
                      Edit
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? 'bg-violet-500 text-white dark:text-black'
                          : 'text-gray-900 dark:text-white'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <TrashIcon
                          className='mr-2 h-5 w-5'
                          aria-hidden='true'
                        />
                      ) : (
                        <TrashIcon
                          className='mr-2 h-5 w-5'
                          aria-hidden='true'
                        />
                      )}
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </>
            )}
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active
                      ? 'bg-violet-500 text-white '
                      : 'text-gray-900 dark:text-white'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <DocumentDuplicateIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  ) : (
                    <DocumentDuplicateIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  )}
                  Copy link
                </button>
              )}
            </Menu.Item>
          </div>
          {/* <div className='px-1 py-1'> */}
        </Menu.Items>
        {/* {editPostModal && <EditPostModal />} */}
      </Menu>
    </div>
  );
};

export default PostActionsModal;
