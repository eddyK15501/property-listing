import Link from 'next/link';
import connectDB from '@/config/connection';
import Property from '@/models/Property';
import PropertyDetails from '@/components/Property/PropertyDetails';
import PropertyBanner from '@/components/Property/PropertyBanner';
import PropertyImages from '@/components/Property/PropertyImages';
import PropertyContactForm from '@/components/Property/PropertyContactForm';
import BookmarkButton from '@/components/Aside/BookmarkButton';
import ShareButton from '@/components/Aside/ShareButton';
import { FaArrowCircleLeft } from 'react-icons/fa';
import convertToSerializable from '@/utils/convert';

const PropertyDetailsPage = async ({ params }) => {
  await connectDB();
  const leanProperty = await Property.findById(params.id).lean();
  const property = convertToSerializable(leanProperty);

  if (!property) {
    return (
      <h1 className='font-bold mt-10 text-center text-2xl'>
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      <PropertyBanner src={property.images[0]} />
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            href='/properties'
            className='flex items-center font-medium text-blue-500 hover:text-blue-400'
          >
            <FaArrowCircleLeft size='22' className='mr-2' /> Back to Properties
          </Link>
        </div>
      </section>
      <section className='bg-blue-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/28 w-full gap-6'>
            <PropertyDetails property={property} />
            <aside className="space-y-4"></aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyDetailsPage;
