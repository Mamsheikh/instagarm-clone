import { Dialog } from '@headlessui/react';
import { PhotographIcon, PlayIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { postState } from '../atoms/addPostState';
import { editPostModalState, editPostState } from '../atoms/editPostState';
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from '../generated/graphql';
import { refreshData } from '../utils';
import { imagesUpload } from '../utils/imageUpload';
import UserCard from './UserCard';

const EditPostModal = () => {
  const router = useRouter();
  const [updatePost, { loading, error }] = useUpdatePostMutation({
    onCompleted: () => {
      toast.success('Post updated Successfull🎉');
      setEditPostModal(false);
      refreshData(router);
    },
  });
  const inputRef = useRef(null);
  const [editPostData, setEditPostData] = useRecoilState(editPostState);
  const [editPostModal, setEditPostModal] = useRecoilState(editPostModalState);
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [caption, setCaption] = useState('');

  const handleImagesChange = (e) => {
    const files = [...e.target.files];
    // console.log(URL.createObjectURL(files));
    let err = '';
    let newImages = [];

    files.forEach((file) => {
      if (!file) return (err = 'File does not exist');

      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        return (err = 'Image format not supported');
      }

      return newImages.push(file);
    });
    console.log('newImages', newImages);

    if (err) toast.error(err);
    // setImages([...images, ...newImages]);
    setNewImages(newImages);
    // console.log('images', images);
  };
  // const deleteImage = (index) => {
  //   const newArr = [...images];
  //   newArr.splice(index, 1);
  //   setImages(newArr);
  // };

  const onSubmit = async () => {
    // console.log({ imgNewUrl, imgOldUrl });
    if (caption === editPostData.caption) return;
    // if (imgNewUrl.length > 0) media = await imagesUpload(imgNewUrl);
    try {
      await updatePost({
        variables: {
          input: {
            id: editPostData.id,
            caption: caption,
            // images: [...imgOldUrl, media],
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (editPostModal) {
      setCaption(editPostData.caption);
      setImages(editPostData.images);
      // console.log('edit', editPost);
    }
  }, [editPostModal]);

  return (
    <Dialog
      open={editPostModal}
      onClose={() => setEditPostModal(!editPostModal)}
      className='fixed inset-0 z-50 flex justify-center'
    >
      <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-20' />
      <div className='relative  mx-4 mt-[10vh] max-h-[85vh] w-full max-w-sm rounded-lg bg-white dark:bg-black '>
        <span className='flex items-center justify-center border-b border-gray-300  pb-3 pt-3 text-center font-semibold'>
          update post
        </span>
        <div className='relative top-0 -mt-12 flex items-center justify-end px-3 py-3'>
          <XIcon
            className=' h-6 w-6 cursor-pointer dark:text-white'
            onClick={() => setEditPostModal(!editPostModal)}
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
                  {/* <div className='relative top-2 -left-1 '>
                    <XIcon
                      onClick={() => deleteImage(index)}
                      className='relative  h-5 w-5 cursor-pointer   rounded-full text-red-600 hover:text-red-900'
                    />
                  </div> */}
                  <img
                    className=' h-full w-full object-cover'
                    src={image ? image : URL.createObjectURL(image)}
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
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className='mt-6 w-full  rounded-lg border border-gray-300 px-4 py-1 focus:outline-none'
          />
          <button
            onClick={onSubmit}
            className='mt-6 rounded bg-gray-700 px-4 py-1 text-white hover:bg-gray-600'
          >
            {loading ? (
              <span className='flex items-center justify-center'>
                <svg
                  className='mr-1 h-6 w-6 animate-spin'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z' />
                </svg>
                updating...
              </span>
            ) : (
              <span>Update</span>
            )}
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default EditPostModal;
