import React from 'react';

const Carousel = ({ images, id }) => {
  const isActive = (index) => {
    if (index === 0) {
      return 'active';
    } else {
      return '';
    }
  };
  return (
    <div
      id={`image${id}`}
      className='slide carousel relative'
      data-bs-ride='carousel'
    >
      <div className='carousel-indicators absolute right-0 bottom-0 left-0 mb-4 flex justify-center p-0'>
        {images.map((image, index) => (
          <button
            key={index}
            type='button'
            data-bs-target={`image${id}`}
            data-bs-slide-to={index}
            className={isActive(index)}
            aria-current='true'
            aria-label='Slide 1'
          ></button>
        ))}
      </div>
      <div className='carousel-inner relative w-full overflow-hidden'>
        {images.map((img, index) => (
          <div
            key={index}
            className={`carousel-item ${isActive(index)} float-left w-full`}
          >
            <img src={img} className='block w-full' alt={img} />
          </div>
        ))}
      </div>
      <button
        className='carousel-control-prev absolute top-0 bottom-0 left-0 flex items-center justify-center border-0 p-0 text-center hover:no-underline hover:outline-none focus:no-underline focus:outline-none'
        type='button'
        data-bs-target={`image${id}`}
        data-bs-slide='prev'
      >
        <span
          className='carousel-control-prev-icon inline-block bg-no-repeat'
          aria-hidden='true'
        ></span>
        <span className='visually-hidden'>Previous</span>
      </button>
      <button
        className='carousel-control-next absolute top-0 bottom-0 right-0 flex items-center justify-center border-0 p-0 text-center hover:no-underline hover:outline-none focus:no-underline focus:outline-none'
        type='button'
        data-bs-target={`image${id}`}
        data-bs-slide='next'
      >
        <span
          className='carousel-control-next-icon inline-block bg-no-repeat'
          aria-hidden='true'
        ></span>
        <span className='visually-hidden'>Next</span>
      </button>
    </div>
  );
};

export default Carousel;
