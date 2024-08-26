import PropertyCard from '@/components/Property/PropertyCard';
import connectDB from '@/config/connection';
import { sessionUser } from '@/utils/sessionUser';
import User from '@/models/User';

const SavedPropertiesPage = async () => {
  await connectDB();
  const { userId } = await sessionUser();
  const user = await User.findById(userId).populate('bookmarks');

  const { bookmarks } = user;

  return (
    <section className='min-h-[80vh] px-4 pt-6 pb-8'>
      <div className='container m-auto px-4 py-6'>
        <h1 className='text-2xl mb-4'>Saved Properties</h1>
        {bookmarks.length === 0 ? (
          <p className='text-md text-center mt-10'>No saved properties</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {bookmarks.map((prop) => (
              <PropertyCard key={prop._id} property={prop} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
