import React, { ReactChildren } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className='bg-gray-100 dark:bg-black'>
      <Header />

      {children}
    </div>
  );
};

export default Layout;
