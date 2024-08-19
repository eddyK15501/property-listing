'use server';
import connectDB from '@/config/connection';
import User from '@/models/User';
import { sessionUser } from '@/utils/sessionUser';
import { revalidatePath } from 'next/cache';

export async function bookmarkProperty(propId) {
  await connectDB();
  const getSessionUser = await sessionUser();

  if (!getSessionUser || !getSessionUser.userId) {
    throw new Error('User ID not found');
  }

  const { userId } = getSessionUser;
  const user = await User.findById(userId);
  const isBookmarked = user.bookmarks.includes(propId);

  let message;

  if (!isBookmarked) {
    user.bookmarks.push(propId);
    message = 'Bookmark Saved';
    isBookmarked = true;
  } else {
    user.bookmarks.pull(propId);
    message = 'Bookmark Removed';
    isBookmarked = false;
  }

  await user.save();
  revalidatePath('/properties/saved');

  return { message, isBookmarked };
}
