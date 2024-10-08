import Link from 'next/link';
import PropertyCard from '../Property/PropertyCard';
import connectDB from '@/config/connection';
import Property from '@/models/Property';

const HomeProperties = async () => {
  await connectDB();
  const mostRecent = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <h2 className='text-3xl font-bold text-center text-blue-500 mb-6 md:text-left'>
            Most Recent
          </h2>
          {mostRecent.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
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
          className='w-[250px] md:w-[350px] mx-auto block bg-blue-500 text-white text-center text-md py-3.5 px-6 rounded-full hover:bg-blue-400'
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
