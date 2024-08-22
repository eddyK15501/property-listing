import Link from 'next/link';
import connectDB from '@/config/connection';
import Property from '@/models/Property';
import convertToSerializable from '@/utils/convert';
import PropertyCard from '@/components/Property/PropertyCard';
import PropertySearch from '@/components/Property/PropertySearch';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

const SearchResultsPage = async ({
  searchParams: { location, propertyType },
}) => {
  await connectDB();
  const locationPattern = new RegExp(location, 'i');

  let dbQuery = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { 'location.street': locationPattern },
      { 'location.city': locationPattern },
      { 'location.state': locationPattern },
      { 'location.zipcode': locationPattern },
    ],
  };

  if (propertyType !== 'All' && propertyType) {
    const typePattern = new RegExp(propertyType, 'i');
    dbQuery.type = typePattern;
  }

  const queryResults = await Property.find(dbQuery).lean();
  const properties = convertToSerializable(queryResults);

  return (
    <>
      <section className='bg-blue-700 py-4'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
          <PropertySearch />
        </div>
      </section>
      <section className='px-4 py-6 mb-16'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <Link
            href='/properties'
            className='flex items-center text-blue-500 hover:underline hover:text-blue-600 mb-6'
          >
            <FaArrowAltCircleLeft className='mr-2' />
            Back To Properties
          </Link>
          <h1 className="text-2xl mb-4">Search Results</h1>
          {properties.length === 0 ? (<p>No search results</p>) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((prop) => (
                    <PropertyCard key={prop._id} property={prop} />
                ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
