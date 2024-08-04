import Link from 'next/link';
import PropertyCard from '../PropertyCard';
import properties from '@/properties/properties.json';

const HomeProperties = () => {
  const mostRecent = properties.slice(0, 3);

  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <h2 className='text-3xl font-bold text-center text-blue-500 mb-6 md:text-left'>
            Most Recent
          </h2>
          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {mostRecent.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
      <section className='mx-auto max-w-lg my-4 px-14'>
        <Link
          href='/properties'
          className='block bg-blue-500 text-white text-center py-4 px-6 rounded-xl hover:bg-blue-400'
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
