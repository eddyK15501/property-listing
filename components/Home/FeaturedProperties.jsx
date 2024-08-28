import connectDB from '@/config/connection';
import Property from '@/models/Property';

const FeaturedProperties = async () => {
  await connectDB();

  const properties = await Property.find({}).lean();

  return properties.length > 0 ? (
    <section className='bg-blue-50 px-4 pt-6 pb-10'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <h2 className='text-center text-3xl font-bold text-blue-500 mb-6'>
          Featured Properties
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {properties.map((prop) => (
            <div key={prop._id}>
              <h2>{prop.name}</h2>
              <h3>{prop.type}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : null;
};

export default FeaturedProperties;
