import PropertyCard from '@/components/Property/PropertyCard';
import connectDB from '@/config/connection';
import Property from '@/models/Property';
import Pagination from '@/components/Pagination';

const PropertiesPage = async ({ searchParams: { page = 1, size = 9 } }) => {
  await connectDB();

  // Logic for pagination
  const skip = (page - 1) * size;
  const total = await Property.countDocuments({});

  const properties = await Property.find({}).skip(skip).limit(size);

  return (
    <section className='px-4 pt-6 pb-12'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        {total > size && (
          <Pagination
            page={parseInt(page)}
            size={parseInt(size)}
            total={total}
          />
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
