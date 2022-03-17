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
  const onSubmit = async () => {
    try {
      await createComment({
        variables: {
          content,
          postId,
        },
        refetchQueries: () => [{ query: GetPostsDocument }],
      });
    } catch (error) {}
  };
  return (
    <>
      <div className=' flex items-center p-4'>
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
          onChange={(e) => setContent(e.target.value)}
          placeholder='Add a comment...'
          className='flex-1 border-none outline-none focus:ring-0 dark:bg-black dark:text-white'
        />
        <button className='font-semibold text-blue-400' onClick={onSubmit}>
          Post
        </button>
      </div>
    </>
  );
};

export default AddComment;
