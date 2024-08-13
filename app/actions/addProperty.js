'use server';
import connectDB from '@/config/connection';
import Property from '@/models/Property';
import { sessionUser } from '@/utils/sessionUser';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function addProperty(formData) {
  await connectDB();

  const getSessionUser = await sessionUser();

  if (!getSessionUser || !getSessionUser.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = getSessionUser;

  const amenities = formData.getAll('amenities');
  const images = formData
    .getAll('images')
    .filter((img) => img.name !== '')
    .map((img) => img.name);

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
    amenities,
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
    images,
  };

  const newProperty = new Property(propData);
  await newProperty.save();

  revalidatePath('/');

  redirect(`/properties/${newProperty._id}`);
}
