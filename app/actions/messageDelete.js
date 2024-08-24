'use server';
import connectDB from '@/config/connection';
import Message from '@/models/Message';
import { sessionUser } from '@/utils/sessionUser';
import { revalidatePath } from 'next/cache';

export async function messageDelete(messageId) {
  try {
    await connectDB();
    const getSessionUser = await sessionUser();

    if (!getSessionUser || !getSessionUser.userId) {
      throw new Error('User ID not found');
    }

    const { userId } = getSessionUser;

    const message = await Message.findById(messageId);

    if (message.recipient.toString() !== userId) {
      throw new Error('Unauthorized');
    }

    await message.deleteOne();

    revalidatePath('/');
  } catch (err) {
    return new Response(err, { status: 500 });
  }
}
