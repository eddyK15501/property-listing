'use client';
import Image from 'next/image';

export default function PropertyImages({ images }) {
  return (
    <section className='bg-blue-50 px-6 py-4 pb-24 md:px-24'>
      <div className='container mx-auto'>
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt='property-img'
            priority={true}
            className='object-cover h-[400px] mx-auto rounded-xl'
            width={1800}
            height={400}
          />
        ) : (
          <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4'>
            {images.map((img) => (
              <div key={img} className='col-auto'>
                <Image
                  src={img}
                  alt='property-img'
                  priority={true}
                  className='w-full h-[400px] rounded-xl object-cover'
                  width={1800}
                  height={400}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
