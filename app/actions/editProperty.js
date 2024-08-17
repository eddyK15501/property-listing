'use server';
import connectDB from '@/config/connection';
import Property from '@/models/Property';
import { sessionUser } from '@/utils/sessionUser';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function editProperty(propId, formData) {
  await connectDB();

  const getSessionUser = await sessionUser();

  if (!getSessionUser || !getSessionUser.userId) {
    throw new Error('User ID not found');
  }

  const { userId } = getSessionUser;

  const getProperty = await Property.findById(propId);

  if (getProperty.owner.toString() !== userId) {
    throw new Error('Unauthorized. User does not own this property');
  }

  const propData = {
    owner: userId,
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zipcode: formData.get('location.zipcode'),
    },
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    square_feet: formData.get('square_feet'),
    amenities: formData.getAll('amenities'),
    rates: {
      weekly: formData.get('rates.weekly'),
      monthly: formData.get('rates.monthly'),
      nightly: formData.get('rates.nightly'),
    },
    seller_info: {
      name: formData.get('seller.name'),
      email: formData.get('seller.email'),
      phone: formData.get('seller.phone'),
    },
  };

  const updatedProperty = await Property.findByIdAndUpdate(propId, propData);

  revalidatePath('/');

  redirect(`/properties/${updatedProperty._id}`)
}
