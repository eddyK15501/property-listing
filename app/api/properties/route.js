import connectDB from '@/config/connection';
import Property from '@/models/Property';

export const GET = async () => {
  try {
    await connectDB();
    const properties = await Property.find({});

    return new Response(properties, { status: 200 })
  } catch (error) {
    return new Response('Error', { status: 500 });
  }
};
