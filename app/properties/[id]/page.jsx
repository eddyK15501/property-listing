import connectDB from '@/config/connection';
import Property from '@/models/Property';
import PropertyBanner from '@/components/Property/PropertyBanner';

const PropertyDetailsPage = async ({ params }) => {
  await connectDB();
  const property = await Property.findById(params.id).lean();

  return (
    <>
      <PropertyBanner src={property.images[0]} />
      <section>
        {property.name} {params.id}
      </section>
    </>
  );
};

export default PropertyDetailsPage;
