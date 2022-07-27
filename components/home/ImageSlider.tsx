import { Image, Transformation } from 'cloudinary-react';
import { useRouter } from 'next/router';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const Slider = ({ images, id, publicId }) => {
  const router = useRouter();

  return (
    <Carousel showThumbs onClickItem={() => router.push(`/p/${id}`)}>
      {/* <Link href={`/p/${id}`}> */}
      {images.map((img, i) => (
        <div className='  w-full  flex-shrink-0' key={img}>
          {/* <Image
            upload_preset='prismagram'
            alt='house carousel'
            dpr='auto'
            quality='auto'
            height={Math.floor((9 / 16) * 350)}
            gravity='auto's
            crop='fill'
            secure
            cloudName='mamsheikh'
            publicId={img}
          /> */}
          {/* <Transformation crop='scale' width='200' angle='10' />
          </Image> */}
          <img src={img} className='w-full cursor-pointer object-contain' />
        </div>
      ))}
      {/* </Link> */}
    </Carousel>
    // );
  );
};

export default Slider;
