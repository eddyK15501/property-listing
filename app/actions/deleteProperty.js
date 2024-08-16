'use server';
import connectDB from '@/config/connection';
import Property from '@/models/Property';
import cloudinary from '@/config/cloudinary';
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

  // Delete images from Cloudinary
  const cloudinaryImgIds = property.images.map((url) => {
    const parts = url.split('/');
    return parts.at(-1).split('.').at(0);
  });

  if (cloudinaryImgIds.length > 0) {
    for (let id of cloudinaryImgIds) {
      await cloudinary.uploader.destroy(`property/${id}`);
    }
  }

  await property.deleteOne();

  revalidatePath('/');
}
