import React from 'react';
import Link from 'next/link';

const InfoBox = ({ children, heading, btnInfo, bgColor = 'bg-blue-100' }) => {
  return (
    <div className={`${bgColor} p-6 rounded-lg shadow-md`}>
      <h2 className='text-2xl font-semibold'>{heading}</h2>
      <p className='mt-2 mb-4'>
        {children}
      </p>
      <Link
        href={btnInfo.link}
        className='inline-block bg-blue-500 text-white w-44 mt-2 rounded-lg px-4 py-2 hover:bg-blue-400'
      >
        {btnInfo.text}
      </Link>
    </div>
  );
};

export default InfoBox;
