import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';
import React, { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { modalState } from '../atoms/modalState';
import { IUser } from '../lib/types';
import { CameraIcon } from '@heroicons/react/outline';
import { useUpdateProfileMutation } from '../generated/graphql';
import toast, { LoaderIcon } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { checkImage } from '../utils/imageUpload';

interface Props {
  user: IUser;
  // userr: IUser
}
const EditProfileModal = ({ user }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const [updateProfile, { loading }] = useUpdateProfileMutation({
    onCompleted: () => {
      // router.push(`/profile/${user.id}`);
      setIsOpen(!isOpen);
      refreshData();
    },
  });
  //   console.log('user', user);
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      bio: user.bio,
      website: user.website,
      username: user.username,
      // image: user.image,
      phone: user.phone,
      address: user.phone,
    },
  });
  const onSubmit = (data) => {
    toast.promise(
      updateProfile({
        variables: {
          input: data,
        },
      }),
      {
        loading: '💁‍♀️ Updating profile',
        error: '😥 something went wrong',
        success: '🎉 Profile updated🥳',
      }
    );
  };
  const changeAvatar = (e) => {
    const file = e.target.files[0];

    const err = checkImage(file);
    if (err) toast.error(err);

    setFile(file);
  };
  console.log(file);
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className='fixed inset-0 z-50 flex justify-center'
    >
      <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-70' />
      <div className='relative mx-4 mt-[10vh] max-h-[85vh] w-full max-w-2xl rounded bg-white '>
        <div className='flex items-center justify-end px-4 py-3'>
          <XIcon
            className=' h-6 w-6 cursor-pointer'
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        <div>
          <span className='flex items-center justify-center text-3xl'>
            Edit Profile
          </span>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-3 px-6 py-3'
          >
            <div className='mb-4 space-y-2 p-3 pb-4'>
              <div className='flex items-center justify-center '>
                <input
                  // {...register('image')}
                  //   name='userLoginInput'
                  type='file'
                  onChange={changeAvatar}
                  accept='image/*'
                  // value={file}
                  ref={fileInput}
                  className='mt-1 hidden w-full rounded border border-gray-300 p-2 outline-none'
                />
                <div className='relative inline-block'>
                  <img
                    className='h-28 w-28 rounded-full  border-2 border-teal-200 object-cover'
                    src={file ? URL.createObjectURL(file) : user && user.image}
                    alt=''
                  />
                  <div className='absolute top-0 flex h-full w-full items-center justify-center rounded-full bg-black bg-opacity-25'>
                    <span
                      className='rounded-full p-2 hover:bg-white hover:bg-opacity-25 focus:outline-none'
                      onClick={() =>
                        fileInput.current && fileInput.current.click()
                      }
                    >
                      <CameraIcon className='h-5 w-5 text-white' />
                    </span>
                  </div>
                </div>
              </div>
              <div className='flex space-x-4'>
                <div className='w-full'>
                  <label
                    htmlFor=''
                    className='block text-sm font-bold text-gray-600'
                  >
                    Full name
                  </label>
                  <input
                    {...register('name')}
                    name='name'
                    type='text'
                    className='mt-1 w-full rounded border border-gray-300 p-2 outline-none'
                  />
                </div>
                <div className='w-full'>
                  <label
                    htmlFor=''
                    className='block text-sm font-bold text-gray-600'
                  >
                    Username
                  </label>
                  <input
                    {...register('username')}
                    name='username'
                    type='text'
                    className='mt-1 w-full rounded border border-gray-300 p-2 outline-none'
                  />
                </div>
              </div>
              <div className='flex space-x-4'>
                <div className='w-full'>
                  <label
                    htmlFor=''
                    className='block text-sm font-bold text-gray-600'
                  >
                    Phone
                  </label>
                  <input
                    {...register('phone')}
                    name='phone'
                    type='text'
                    className='mt-1 w-full rounded border border-gray-300 p-2 outline-none'
                  />
                </div>
                <div className='w-full'>
                  <label
                    htmlFor=''
                    className='block text-sm font-bold text-gray-600'
                  >
                    Address
                  </label>
                  <input
                    {...register('address')}
                    name='address'
                    type='text'
                    className='mt-1 w-full rounded border border-gray-300 p-2 outline-none'
                  />
                </div>
              </div>
              <div className='flex space-x-4'>
                <div className='w-full'>
                  <label
                    htmlFor=''
                    className='block text-sm font-bold text-gray-600'
                  >
                    Website
                  </label>
                  <input
                    {...register('website')}
                    name='website'
                    type='url'
                    className='mt-1 w-full rounded border border-gray-300 p-2 outline-none'
                  />
                </div>
                <div className='w-full'>
                  <label
                    htmlFor=''
                    className='block text-sm font-bold text-gray-600'
                  >
                    Bio
                  </label>
                  <input
                    {...register('bio')}
                    name='bio'
                    type='text'
                    // value={user.bio}
                    // onChange={(e) => console.log(e)}
                    className='mt-1 w-full rounded border border-gray-300 p-2 outline-none'
                  />
                </div>
              </div>
              <button
                type='submit'
                className='block w-full items-center  justify-center rounded bg-blue-500 px-4 py-2 text-white'
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
                    Updating...
                  </span>
                ) : (
                  <span>Update Profile</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default EditProfileModal;
