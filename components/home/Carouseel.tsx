import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const Slider = ({ images, id }) => {
  const router = useRouter();

  return (
    <Carousel showThumbs onClickItem={() => router.push(`/p/${id}`)}>
      {/* <Link href={`/p/${id}`}> */}
      {images.map((img, i) => (
        <div className='w-full flex-shrink-0' key={img}>
          <img src={img} className='w-full cursor-pointer object-cover' />
        </div>
      ))}
      {/* </Link> */}
    </Carousel>
    // );
  );
};

export default Slider;
