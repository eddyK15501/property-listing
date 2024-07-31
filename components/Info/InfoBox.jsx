import React from 'react';

const InfoBox = ({ children, heading, btnInfo, bgColor = 'bg-blue-100' }) => {
  return (
    <div className={`${bgColor} p-6 rounded-lg shadow-md`}>
      <h2 className='text-2xl font-semibold'>{heading}</h2>
      <p className='mt-2 mb-4'>
        {children}
      </p>
      <a
        href={btnInfo.link}
        className='inline-block bg-blue-500 text-white w-44 mt-2 rounded-lg px-4 py-2 hover:bg-blue-400'
      >
        {btnInfo.text}
      </a>
    </div>
  );
};

export default InfoBox;
