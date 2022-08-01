import { EmojiHappyIcon } from '@heroicons/react/outline';
import 'emoji-mart/css/emoji-mart.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  PostsDocument,
  useCreateCommentMutation,
} from '../../generated/graphql';
import { refreshData } from '../../utils';

const AddComment = ({ postId }) => {
  const [content, setContent] = useState('');
  const router = useRouter();
  // const [showEmojis, setShowEmojis] = useState(false);
  const [createComment, { loading }] = useCreateCommentMutation();

  const onChange = (e) => {
    setContent(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await createComment({
        variables: {
          content,
          postId,
        },
        refetchQueries: () => [{ query: PostsDocument }],
        onCompleted: () => {
          if (router.pathname === '/p/[id]') {
            refreshData(router);
          }
        },
      });

      setContent('');
    } catch (error) {}
  };
  return (
    <>
      <form onSubmit={onSubmit} className=' flex items-center p-4'>
        {/* <div className='relative'>
          {showEmojis && (
            <Picker
              // onSelect={addEmoji}
              // className='hidden'
              sheetSize={16}
              style={{
                position: 'absolute',
                marginTop: '465px',
                marginLeft: -40,
                maxWidth: '320px',
                borderRadius: '20px',
              }}
            />
            )} */}
        <EmojiHappyIcon
          onClick={() => {}}
          className='mr-2 h-7 cursor-pointer dark:text-white'
        />
        {/* </div>  */}
        <input
          type='text'
          onChange={onChange}
          value={content}
          placeholder='Add a comment...'
          className='flex-1 border-none outline-none focus:ring-0 dark:bg-gray-900 dark:text-white'
        />
        <button
          type='submit'
          className='font-semibold text-blue-400'
          onClick={onSubmit}
        >
          {loading ? 'Loading...' : 'Post'}
        </button>
      </form>
    </>
  );
};

export default AddComment;
