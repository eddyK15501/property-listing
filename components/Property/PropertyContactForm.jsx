'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { RiMailSendLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { addMessage } from '@/app/actions/addMessage';

const PropertyContactForm = ({ property }) => {
  const { data: session } = useSession();

  return (
    session && (
      <div className='bg-white p-3 lg:p-6 rounded-lg shadow-md'>
        <h3 className='text-xl font-bold mb-6 text-center'>
          Contact Property Manager
        </h3>
        <form>
          <input type='hidden' id='property' name='property' defaultValue={property._id} /> 
          <input type='hidden' id='recipient' name='recipient' defaultValue={property.owner} /> 
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='name'
            >
              Name:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='name'
              type='text'
              placeholder='Enter your name'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='email'
            >
              Email:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='email'
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='phone'
            >
              Phone:
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='phone'
              type='text'
              placeholder='Enter your phone number'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='message'
            >
              Message:
            </label>
            <textarea
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline'
              id='message'
              placeholder='Enter your message'
            ></textarea>
          </div>
          <div>
            <button
              className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center mt-5'
              type='submit'
            >
              <RiMailSendLine className='mr-2 hidden lg:block' /> Send Message
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default PropertyContactForm;
