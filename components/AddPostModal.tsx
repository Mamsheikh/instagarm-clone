import { Dialog } from '@headlessui/react';
import { PhotographIcon, PlayIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { postState } from '../atoms/addPostState';
import { editPostState } from '../atoms/editPostState';
import { useCreatePostMutation } from '../generated/graphql';
import { imagesUpload } from '../utils/imageUpload';
import UserCard from './UserCard';

const AddPostModal = ({ user }) => {
  const [createPost, { loading, error }] = useCreatePostMutation({
    onCompleted: () => {
      toast.success('Post Created Successfull🎉');
      setAddPost(false);
    },
  });
  const inputRef = useRef(null);
  const [editPost, setEditPost] = useRecoilState(editPostState);
  const [addPost, setAddPost] = useRecoilState(postState);
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState('');

  const handleImagesChange = (e) => {
    const files = [...e.target.files];
    let err = '';
    let newImages = [];

    files.forEach((file) => {
      if (!file) return (err = 'File does not exist');

      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        return (err = 'Image format not supported');
      }

      return newImages.push(file);
    });

    if (err) toast.error(err);
    setImages([...images, ...newImages]);
  };
  const deleteImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const onSubmit = async () => {
    let media = [];
    if (images.length > 0) {
      media = await imagesUpload(images);
    }
    if (images.length === 0) {
      toast.error('Please select a cool Pic🌚');
    } else {
      await createPost({
        variables: {
          input: {
            caption,
            images: media,
          },
        },
      });
    }
  };

  return (
    <Dialog
      open={addPost}
      onClose={() => setAddPost(false)}
      className='fixed inset-0 z-50 flex justify-center'
    >
      <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-70' />
      <div className='relative  mx-4 my-auto mt-[10vh] w-full max-w-sm rounded-lg bg-white dark:bg-black '>
        <span className='flex items-center justify-center border-b border-gray-300  pb-3 pt-3 text-center font-semibold'>
          Create new post
        </span>
        <div className='relative top-0 -mt-12 flex items-center justify-end px-3 py-3'>
          <XIcon
            className=' h-6 w-6 cursor-pointer dark:text-white'
            onClick={() => setAddPost(!addPost)}
          />
        </div>
        <div className='flex flex-col items-center justify-center p-6'>
          {images.length === 0 ? (
            <>
              <div
                className='mt-4 h-52 w-full cursor-pointer border-4 border-dashed border-gray-600 bg-gray-100'
                onClick={() => inputRef.current && inputRef.current.click()}
              >
                <div className='flex h-full items-center justify-center'>
                  <span className=' flex cursor-pointer justify-center p-4 text-center'>
                    Click to add image
                  </span>
                </div>
                <input
                  id='image'
                  name='image'
                  onChange={handleImagesChange}
                  ref={inputRef}
                  multiple
                  type='file'
                  accept='image/*'
                  style={{ display: 'none' }}
                />
              </div>
            </>
          ) : (
            <div className='grid  w-full grid-cols-3 items-center gap-3 overflow-y-auto p-2'>
              {images.map((image, index) => (
                <div key={index} className='h-28'>
                  <div className='relative top-2  right-2 '>
                    <XIcon
                      onClick={() => deleteImage(index)}
                      className='relative  h-5 w-5 cursor-pointer   rounded-full text-red-600 hover:text-red-900'
                    />
                  </div>
                  <img
                    className=' h-full w-full object-cover'
                    src={URL.createObjectURL(image)}
                    alt=''
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='px-6 py-2'>
          <input
            type='text'
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder='Enter caption'
            className='w-full rounded border p-2'
          />
          <button className='m-2 w-full rounded bg-blue-500 p-2 text-white transition-all duration-150 ease-out hover:bg-blue-600'>
            Create Post
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default AddPostModal;
