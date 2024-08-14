'use server';
import connectDB from '@/config/connection';
import Property from '@/models/Property';
import { sessionUser } from '@/utils/sessionUser';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import cloudinary from '@/config/cloudinary';

export async function addProperty(formData) {
  await connectDB();

  const getSessionUser = await sessionUser();

  if (!getSessionUser || !getSessionUser.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = getSessionUser;

  const amenities = formData.getAll('amenities');
  const images = formData.getAll('images').filter((img) => img.name !== '');

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
  };

  const imageUrls = [];

  for (const imgFile of images) {
    // Turn individual image files into binary data, using .arrayBuffer()
    const imgBuffer = await imgFile.arrayBuffer();
    // Turn the binary data into uint8 array
    const uint8Arr = new Uint8Array(imgBuffer);
    // Convert uint8 array into a standard JavaScript array
    const imgArray = Array.from(uint8Arr);
    // Convert the standard JavaScript array into a Buffer for binary data manipulation
    const imageData = Buffer.from(imgArray);

    // Convert Buffer to base64
    const imgBase64 = imageData.toString('base64');

    // Request to Cloudinary
    const response = await cloudinary.uploader.upload(
      `data:image/png;base64,${imgBase64}`,
      {
        folder: 'property',
      }
    );

    imageUrls.push(response.secure_url);
  }

  propData.images = imageUrls;

  const newProperty = new Property(propData);
  await newProperty.save();

  revalidatePath('/');

  redirect(`/properties/${newProperty._id}`);
}
