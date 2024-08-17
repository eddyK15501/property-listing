import connectDB from '@/config/connection';
import Property from '@/models/Property';
import convertToSerializable from '@/utils/convert';
import PropertyEditForm from '@/components/Property/PropertyEditForm';

const EditPage = async ({ params }) => {
  await connectDB();
  
  const leanProperty = await Property.findById(params.property_id).lean();
  const property = convertToSerializable(leanProperty);

  if (!property) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property Not Found
      </h1>
    );
  }

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <PropertyEditForm props={property} />
        </div>
      </div>
    </section>
  );
};

export default EditPage;
