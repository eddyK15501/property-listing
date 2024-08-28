'use client';
import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';

export default function PropertyImages({ images }) {
  return (
    <Gallery>
      <section className='bg-blue-50 px-6 py-4 pb-24 md:px-24'>
        <div className='container mx-auto'>
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width='1000'
              height='600'
            >
              {({ ref, open }) => (
                <Image
                  src={images[0]}
                  alt='property-img'
                  priority={true}
                  className='object-cover h-[400px] mx-auto rounded-xl cursor-pointer'
                  width={1800}
                  height={400}
                  ref={ref}
                  onClick={open}
                />
              )}
            </Item>
          ) : (
            <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4'>
              {images.map((img) => (
                <div key={img} className='col-auto'>
                  <Item
                    original={img}
                    thumbnail={img}
                    width='1000'
                    height='600'
                  >
                    {({ ref, open }) => (
                      <Image
                        src={img}
                        alt='property-img'
                        priority={true}
                        className='w-full h-full rounded-xl object-cover cursor-pointer border border-black'
                        width={1800}
                        height={400}
                        ref={ref}
                        onClick={open}
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
}
