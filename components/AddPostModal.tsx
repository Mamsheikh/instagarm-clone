import { Dialog } from '@headlessui/react';
import { PhotographIcon, PlayIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { postState } from '../atoms/addPostState';
import UserCard from './UserCard';

const AddPostModal = () => {
  const inputRef = useRef(null);
  const [addPost, setAddPost] = useRecoilState(postState);
  const [images, setImages] = useState([]);

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
  return (
    <Dialog
      open={addPost}
      onClose={() => setAddPost(false)}
      className='fixed inset-0 z-50 flex justify-center'
    >
      <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-70' />
      <div className='relative  mx-4 mt-[10vh] max-h-[85vh] w-full max-w-sm rounded-lg bg-white dark:bg-black '>
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
              <div className='flex items-stretch'>
                <PhotographIcon className='h-20 w-20 rotate-12 text-sm text-gray-500' />
                <PlayIcon className='-ml-8 h-20 w-20 text-gray-500' />
              </div>
              <span className='mt-4 text-lg text-gray-600'>
                Drag and drop photos and videos here.
              </span>
            </>
          ) : (
            <div className='grid max-h-[270px] w-full grid-cols-3 items-center gap-3 overflow-y-auto'>
              {images.map((image, index) => (
                <div key={index} className=' h-24'>
                  <div className='relative top-2 -left-1 '>
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
          <input
            onChange={handleImagesChange}
            ref={inputRef}
            multiple
            type='file'
            className='hidden'
          />
          <button
            onClick={() => inputRef.current && inputRef.current.click()}
            className='mt-6 mb-2 rounded bg-blue-500 px-6 py-1 font-semibold text-white focus:outline-none'
          >
            Select from computer
          </button>
          {/* <div className='grid  max-h-[250px] grid-cols-3 gap-2 overflow-y-auto'>
            {images.map((image, index) => (
              <div key={index} className='max-h-[250px] '>
                <div className='overflow-hidden  overflow-y-auto '>
                  <img
                    className=' block h-full w-full rounded  object-cover'
                    src={URL.createObjectURL(image)}
                    alt='images'
                  />
                </div>
              </div>
            ))}
          </div> */}
          <input
            placeholder='Enter a catchy caption'
            type='text'
            className='mt-6 w-full  rounded-lg border border-gray-300 px-4 py-1 focus:outline-none'
          />
          <button className='mt-6 rounded bg-gray-700 px-4 py-1 text-white hover:bg-gray-600'>
            Post
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default AddPostModal;
