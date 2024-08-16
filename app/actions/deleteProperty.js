'use server';
import connectDB from '@/config/connection';
import Property from '@/models/Property';
import { sessionUser } from '@/utils/sessionUser';
import { revalidatePath } from 'next/cache';

export async function deleteProperty(propertyId) {
  await connectDB();
  const getSessionUser = await sessionUser();

  if (!getSessionUser || !getSessionUser.userId) {
    throw new Error('User ID not found');
  }

  const { userId } = getSessionUser;

  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error('Property not found');
  }

  if (property.owner.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  await property.deleteOne();
}
