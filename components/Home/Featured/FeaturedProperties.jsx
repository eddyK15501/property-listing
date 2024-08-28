import connectDB from '@/config/connection';
import Property from '@/models/Property';
import FeaturedCard from './FeaturedCard';

const FeaturedProperties = async () => {
  await connectDB();

  const properties = await Property.find({ is_featured: true }).lean();

  return properties.length > 0 ? (
    <section className='bg-blue-50 px-4 pt-6 pb-10 shadow-md'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <h2 className='text-center text-3xl font-bold text-blue-500 mb-6'>
          Featured Properties
        </h2>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {properties.map((property) => (
            <FeaturedCard property={property} key={property._id} />
          ))}
        </div>
      </div>
    </section>
  ) : null;
};

export default FeaturedProperties;
