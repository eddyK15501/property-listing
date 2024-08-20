'use server';
import connectDB from '@/config/connection';
import User from '@/models/User';
import { sessionUser } from '@/utils/sessionUser';

export async function bookmarkStatus(propId) {
  try {
    await connectDB();
    const getSessionUser = await sessionUser();

    if (!getSessionUser || !getSessionUser.userId) {
      throw new Error('User ID not found');
    }

    const { userId } = getSessionUser;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    let isBookmarked = user.bookmarks.includes(propId);

    return { isBookmarked };
  } catch (err) {
    return { error: err.message };
  }
}
