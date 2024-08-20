import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/images/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-200 py-4'>
      <div className='container mx-auto flex flex-col md:flex-row items-center justify-between px-4'>
        <div className='flex items-center'>
          <div className='mb-4 md:mb-0'>
            <Image src={logo} alt='Logo' className='h-8 w-auto' />
          </div>
          <div className='font-medium mb-4 ml-3 md:mb-0 md:ml-6'>
            <ul className='flex space-x-5'>
              <li>
                <Link href='/properties'>View Properties</Link>
              </li>
              <li>
                <Link href='/'>Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <p className='text-sm text-gray-500 mt-2 md:mt-0'>
            &copy; {currentYear} PropertyListing | All Rights Reserved | Powered by <span className='text-gray-400'>Next.js</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
