import { EmojiHappyIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import {
  GetPostsDocument,
  useCreateCommentMutation,
} from '../../generated/graphql';

const AddComment = ({ postId }) => {
  const [content, setContent] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [createComment] = useCreateCommentMutation();

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
        refetchQueries: () => [{ query: GetPostsDocument }],
        onCompleted: () => {
          setContent('');
        },
      });
    } catch (error) {}
  };
  return (
    <>
      <form onSubmit={onSubmit} className=' flex items-center p-4'>
        {/* <div className='relative'> */}
        {/* {showEmojis && (
          <Picker

            // onSelect={addEmoji}
            className='hidden'
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
          onClick={() => setShowEmojis(!showEmojis)}
          className='mr-2 h-7 cursor-pointer dark:text-white'
        />

        {/* </div> */}
        <input
          type='text'
          onChange={onChange}
          placeholder='Add a comment...'
          className='flex-1 border-none outline-none focus:ring-0 dark:bg-black dark:text-white'
        />
        <button
          type='submit'
          className='font-semibold text-blue-400'
          // onClick={onSubmit}
        >
          Post
        </button>
      </form>
    </>
  );
};

export default AddComment;
