import { Dialog, Menu } from '@headlessui/react';
import {
  DocumentDuplicateIcon,
  DotsHorizontalIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon,
  XIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react';
import { useRecoilState } from 'recoil';
import { postState } from '../../atoms/addPostState';
import { editPostModalState, editPostState } from '../../atoms/editPostState';
import { postActionsState } from '../../atoms/postActionState';
import { userState } from '../../atoms/userState';
import { IUser } from '../../lib/types';
import EditPostModal from '../EditPostModal';

const PostActionsModal = ({ post, open, setOpen, editPost, setEditPost }) => {
  // console.log('post', user);
  const [isOpen, setIsOpen] = useRecoilState(postActionsState);
  // const [editPost, setEditPost] = useRecoilState(editPostState);
  const [editPostModal, setEditPostModal] = useRecoilState(editPostModalState);
  const [viewer, setViewer] = useRecoilState<IUser>(userState);
  const [addPost, setAddPost] = useRecoilState(postState);

  const onEditPost = () => {
    setOpen(false);
    setEditPost(!editPost);
  };
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(!open)}
      className='fixed inset-0 z-50 flex justify-center'
    >
      <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-80' />
      <div className='relative  mx-4 mt-[30vh] max-h-40 w-full max-w-md rounded-lg bg-white dark:bg-black '>
        <div className='flex flex-col items-center justify-center space-y-2 px-4 py-3'>
          <div className='w-full border-b'>
            <button className='mb-1 w-full font-semibold text-red-400'>
              <span className='text-center'>Delete Post</span>
            </button>
          </div>
          <div className='w-full border-b'>
            <button className='mb-1 w-full ' onClick={onEditPost}>
              <span className='text-center'>Edit Post</span>
            </button>
          </div>
          <div className='w-full border-b'>
            <button className='mb-1 w-full  '>
              <span className='text-center'>
                {' '}
                <Link href={`/p/${post.id}`}>Go to Post</Link>
              </span>
            </button>
          </div>
          <div className='w-full'>
            <button className='-mt-1  w-full' onClick={() => setOpen(!open)}>
              <span className='text-center'>Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default PostActionsModal;
