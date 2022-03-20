import React from 'react';
import { BsMessenger } from 'react-icons/bs';
import LeftSide from '../components/message/LeftSide';

const message = () => {
  return (
    <div className='mx-auto grid grid-cols-1 pt-20 md:max-w-3xl md:grid-cols-2 xl:max-w-4xl xl:grid-cols-3'>
      <section className='col-span-1 border-r border-gray-300'>
        <LeftSide />
      </section>
      <section className='col-span-2 md:col-span-1'>
        <div className='flex h-screen flex-col items-center justify-center'>
          <BsMessenger size={64} className='h-20 text-blue-500' />
          <span className='text-2xl font-bold'>Messenger</span>
        </div>
      </section>
    </div>
  );
};

export default message;
