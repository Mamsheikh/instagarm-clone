import React from 'react';
import { BallTriangle } from 'react-loader-spinner';

const LoadingScreen = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-gray-100'>
      <BallTriangle color='#616161' height={80} width={80} />
      <p className='mt-4 text-center text-sm font-semibold text-gray-700'>
        Launching Prismagram...
      </p>
    </div>
  );
};

export default LoadingScreen;
