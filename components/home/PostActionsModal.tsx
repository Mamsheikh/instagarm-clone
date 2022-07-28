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
import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilState } from 'recoil';
import { postState } from '../../atoms/addPostState';
import { editPostModalState, editPostState } from '../../atoms/editPostState';
import { postActionsState } from '../../atoms/postActionState';
import { userState } from '../../atoms/userState';
import { Post, useDeletePostMutation } from '../../generated/graphql';
import { IUser } from '../../lib/types';
import EditPostModal from '../EditPostModal';

interface PostActionsModalProps {
  post: Post;
  open: boolean;
  setOpen?: (open: boolean) => void;
  editPost?: boolean;
  setEditPost?: (editPost: boolean) => void;
}

const PostActionsModal: React.FC<PostActionsModalProps> = ({
  post,
  open,
  setOpen,
  editPost,
  setEditPost,
}) => {
  const [deletePost, { loading }] = useDeletePostMutation();
  const router = useRouter();

  const onEditPost = () => {
    setOpen(false);
    setEditPost(!editPost);
  };
  const onDeletePost = async () => {
    await deletePost({
      variables: {
        postId: post.id,
      },
      update: (cache) => {
        cache.evict({ id: 'Post:' + post.id });
      },
      onCompleted: () => {
        router.push('/');
      },
    });
    setOpen(false);
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
            <button
              onClick={onDeletePost}
              className='mb-1 w-full font-semibold text-red-400 outline-none focus:outline-none'
            >
              <span className='text-center'>
                {loading ? 'Deleting...' : 'Delete Post'}
              </span>
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
