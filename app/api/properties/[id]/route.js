import connectDB from '@/config/connection';
import Property from '@/models/Property';

export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const property = await Property.findById(params.id);

    if (!property) return new Response('Property not found', { status: 404 });

    return new Response(property, { status: 200 })
  } catch (error) {
    return new Response('Error', { status: 500 });
  }
};
