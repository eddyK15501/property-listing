import Link from 'next/link';
import connectDB from '@/config/connection';
import Property from '@/models/Property';
import PropertyBanner from '@/components/Property/PropertyBanner';
import { FaArrowCircleLeft } from 'react-icons/fa';

const PropertyDetailsPage = async ({ params }) => {
  await connectDB();
  const property = await Property.findById(params.id).lean();

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
      <section>
        {property.name} {params.id}
      </section>
    </>
  );
};

export default PropertyDetailsPage;
