import Image from 'next/image';
import Link from 'next/link';
import {
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { IoIosBed } from 'react-icons/io';

const PropertyCard = ({ property }) => {
  const displayRates = () => {
    const { rates } = property;

    if (rates.monthly) {
      return `$${rates.monthly}/mo`;
    } else if (rates.weekly) {
      return `$${rates.weekly}/wk`;
    } else if (rates.nightly) {
      return `$${rates.nightly}/night`;
    }
  };

  return (
    <div className='rounded-xl shadow-md relative'>
      <Link href={`/properties/${property._id}`}>
        <Image
          src={property.images[0]}
          width='0'
          height='0'
          sizes='100vw'
          alt='properties-image'
          className='w-full h-auto rounded-t-xl'
        />
      </Link>
      <div className='p-4'>
        <div className='text-left md:text-center lg:text-left mb-6'>
          <div className='text-gray-600'>{property.type}</div>
          <h3 className='text-xl font-bold'>{property.name}</h3>
        </div>
        <h3 className='absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
          {displayRates()}
        </h3>

        <div className='flex flex-wrap justify-center gap-4 text-black mb-4'>
          <p className='flex items-center gap-1 font-bold'>
            <IoIosBed className='lg:inline' size={20} /> {property.beds}
            <span className='font-medium lg:inline'> Beds</span>
          </p>
          <p className='flex items-center gap-1 font-bold'>
            <FaBath className='lg:inline' /> {property.baths}
            <span className='font-medium lg:inline'> Baths</span>
          </p>
          <p className='flex items-center gap-1 font-bold'>
            <FaRulerCombined className='lg:inline' /> {property.square_feet}
            <span className='font-medium lg:inline'> sqft</span>
          </p>
        </div>
        <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
          <p className='flex items-center gap-1'>
            <FaMoneyBill className='lg:inline' />
            <span>Weekly</span>
          </p>
          <p className='flex items-center gap-1'>
            <FaMoneyBill className='lg:inline' />
            <span>Monthly</span>
          </p>
        </div>
        <div className='border border-gray-100 mb-5'></div>
        <div className='flex flex-col lg:flex-row justify-between mb-4'>
          <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
            <FaMapMarkerAlt className='text-orange-700 mt-1' />
            <span className='text-orange-700'>
              {' '}
              {property.location.city}, {property.location.state}{' '}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className='h-[36px] bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
