import Link from 'next/link';
import Image from 'next/image';
import {
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { IoIosBed } from 'react-icons/io';

const FeaturedCard = ({ property }) => {
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
    <div className='bg-white rounded-xl shadow-md relative flex flex-col md:flex-row'>
      <Image
        src={property.images[0]}
        alt='featured-property-img'
        width='0'
        height='0'
        sizes='100vw'
        className='object-cover object-center rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5'
      />
      <div className='w-full p-6'>
        <h3 className='text-xl font-bold'>{property.name}</h3>
        <div className='text-gray-600 mb-4'>{property.type}</div>
        <h3 className='absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
          {displayRates()}
        </h3>
        <div className='flex flex-wrap justify-center gap-4 text-slate-500 mb-4'>
          <p className='flex items-center gap-1 font-bold'>
            <IoIosBed className='lg:inline' size={20} /> {property.beds}
            <span className='font-medium lg:inline'>
              {' '}
              {property.beds === 1 ? 'Bed' : 'Beds'}
            </span>
          </p>
          <p className='flex items-center gap-1 font-bold'>
            <FaBath className='lg:inline' /> {property.baths}
            <span className='font-medium lg:inline'>
              {' '}
              {property.baths === 1 ? 'Bath' : 'Baths'}
            </span>
          </p>
          <p className='flex items-center gap-1 font-bold'>
            <FaRulerCombined className='lg:inline' /> {property.square_feet}
            <span className='font-medium lg:inline'> sqft</span>
          </p>
        </div>
        <div className='flex justify-center gap-4 text-green-700 text-sm mb-4'>
          {property.rates.monthly && (
            <p className='flex items-center gap-1'>
              <FaMoneyBill className='lg:inline' />
              <span>Monthly</span>
            </p>
          )}
          {property.rates.weekly && (
            <p className='flex items-center gap-1'>
              <FaMoneyBill className='lg:inline' />
              <span>Weekly</span>
            </p>
          )}
          {property.rates.nightly && (
            <p className='flex items-center gap-1'>
              <FaMoneyBill className='lg:inline' />
              <span>Nightly</span>
            </p>
          )}
        </div>
        <div className='border border-gray-200 mb-5'></div>
        <div className='flex flex-col lg:flex-row justify-between'>
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

export default FeaturedCard;
