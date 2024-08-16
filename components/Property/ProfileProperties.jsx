'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { deleteProperty } from '@/app/actions/deleteProperty';

const ProfileProperties = ({ userProperties }) => {
  const [properties, setProperties] = useState(userProperties);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this property?');
    if (!confirmed) return;

    await deleteProperty(id);

    const updatedProperties = properties.filter(prop => prop._id !== id);
    setProperties(updatedProperties);
  }

  return properties.map((property) => (
    <div key={property._id} className='mb-10'>
      <Link href={`/properties/${property._id}`}>
        <Image
          className='h-32 w-full rounded-md object-cover'
          src={property.images[0]}
          alt='profile-property-img-1'
          width={1000}
          height={200}
        />
      </Link>
      <div className='flex justify-center md:justify-between items-center flex-wrap'>
        <div className='mt-2'>
          <p className='text-lg font-semibold'>{property.name}</p>
          <p className='text-gray-600'>{property.location.street}, {property.location.city} {property.location.state}</p>
        </div>
        <div className='mt-2'>
          <a
            href='/add-property.html'
            className='inline-block w-20 text-center bg-blue-500 text-white px-3 py-2 rounded-md mr-2 hover:bg-blue-600'
          >
            Edit
          </a>
          <button
            className='inline-block w-20 text-center bg-rose-500 text-white px-3 py-2 rounded-md hover:bg-rose-600'
            type='button'
            onClick={() => handleDelete(property._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ));
};

export default ProfileProperties;
