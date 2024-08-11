'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/images/logo-white.png';
import defaultProfile from '@/assets/images/profile.png';
import { FaGoogle } from 'react-icons/fa6';
import { useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  const profileMenuRef = useRef(null);
  const profileBtnRef = useRef(null);

  const [profileMenu, setProfileMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleOuterClick = (e) => {
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(e.target) &&
      profileBtnRef.current &&
      !profileBtnRef.current.contains(e.target)
    ) {
      setProfileMenu(false);
    }
  };

  useEffect(() => {
    if (profileMenu) {
      document.addEventListener('mousedown', handleOuterClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOuterClick);
    };
  }, [profileMenu]);

  return (
    <nav className='bg-blue-700 border-b border-blue-500'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-20 items-center justify-between'>
          <div className='absolute inset-y-0 left-0 flex items-center lg:hidden'>
            <button
              type='button'
              id='mobile-dropdown-button'
              className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white focus:outline-none'
              aria-controls='mobile-menu'
              aria-expanded='false'
              onClick={() => setMobileMenu((prev) => !prev)}
            >
              <span className='absolute -inset-0.5'></span>
              <span className='sr-only'>Open main menu</span>
              <svg
                className='block h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
            </button>
          </div>
          <div className='flex flex-1 items-center justify-center lg:items-stretch lg:justify-start'>
            <Link className='flex flex-shrink-0 items-center' href='/'>
              <Image
                className='h-10 w-auto'
                src={logo}
                alt='Property-Listing'
              />
              <span className='hidden lg:block text-white text-2xl font-bold ml-2'>
                PropertyListing
              </span>
            </Link>
            <div className='hidden lg:ml-6 lg:block'>
              <div className='flex space-x-2'>
                <Link
                  href='/'
                  className='text-white hover:text-gray-300 rounded-md px-3 py-2'
                >
                  Home
                </Link>
                <Link
                  href='/properties'
                  className='text-white hover:text-gray-300 rounded-md px-3 py-2'
                >
                  Properties
                </Link>
                {session && (
                  <Link
                    href='/properties/add'
                    className='text-white hover:text-gray-300 rounded-md px-3 py-2'
                  >
                    Add Property
                  </Link>
                )}
              </div>
            </div>
          </div>
          {!session && (
            <div className='hidden lg:block lg:ml-6'>
              <div className='flex items-center'>
                <button className='flex items-center text-white hover:bg-blue-500 hover:transition rounded-md px-3 py-2'>
                  <FaGoogle className='text-white mr-2' />
                  <span>Login or Register</span>
                </button>
              </div>
            </div>
          )}
          {session && (
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0'>
              <Link href='/messages' className='relative group'>
                <button
                  type='button'
                  className='relative rounded-full bg-gray-200 p-1 text-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                >
                  <span className='absolute -inset-1.5'></span>
                  <span className='sr-only'>View notifications</span>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
                    />
                  </svg>
                </button>
                <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
                  2
                </span>
              </Link>
              <div className='relative ml-3'>
                <div>
                  <button
                    ref={profileBtnRef}
                    type='button'
                    className='relative flex rounded-full bg-none text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                    id='user-menu-button'
                    aria-expanded='false'
                    aria-haspopup='true'
                    onClick={() => setProfileMenu((prev) => !prev)}
                  >
                    <span className='absolute -inset-1.5'></span>
                    <span className='sr-only'>Open user menu</span>
                    <Image
                      className='h-8 w-8 rounded-full'
                      src={defaultProfile}
                      alt='default-profile-icon'
                    />
                  </button>
                </div>
                {profileMenu && (
                  <div
                    ref={profileMenuRef}
                    id='user-menu'
                    className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='user-menu-button'
                    tabIndex='-1'
                  >
                    <Link
                      href='/profile'
                      className='block px-4 py-2 text-sm text-gray-700'
                      role='menuitem'
                      tabIndex='-1'
                      id='user-menu-item-0'
                    >
                      Your Profile
                    </Link>
                    <Link
                      href='/properties/saved'
                      className='block px-4 py-2 text-sm text-gray-700'
                      role='menuitem'
                      tabIndex='-1'
                      id='user-menu-item-2'
                    >
                      Saved Properties
                    </Link>
                    <button
                      className='block px-4 py-2 text-sm text-gray-700'
                      role='menuitem'
                      tabIndex='-1'
                      id='user-menu-item-2'
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {mobileMenu && (
        <div id='mobile-menu'>
          <div className='space-y-1 px-2 pb-3 pt-2'>
            <Link
              href='/'
              className='text-gray-300 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
            >
              Home
            </Link>
            <Link
              href='/properties'
              className='text-gray-300 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
            >
              Properties
            </Link>
            {session && (
              <Link
                href='/properties/add'
                className='text-gray-300 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
              >
                Add Property
              </Link>
            )}
          </div>
          <div className='mt-2 mb-5 ml-3'>
            {!session && (
              <button className='flex items-center text-white bg-blue-500 hover:bg-blue-400 hover:text-white hover:transition rounded-md px-3 py-2'>
                <FaGoogle className='mr-2' />
                <span>Login or Register</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
