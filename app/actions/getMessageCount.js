'use server';
import connectDB from '@/config/connection';
import Message from '@/models/Message';
import { sessionUser } from '@/utils/sessionUser';

export async function getMessageCount() {
  try {
    await connectDB();
    const getSessionUser = await sessionUser();

    if (!getSessionUser || !getSessionUser.userId) {
      throw new Error('User ID not found');
    }

    const { userId } = getSessionUser;

    const count = await Message.countDocuments({
      recipient: userId,
      read: false,
    });

    return { count };
  } catch (err) {
    return new Response(err, { status: 500 });
  }
}
