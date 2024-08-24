'use server';
import connectDB from '@/config/connection';
import Message from '@/models/User';
import { sessionUser } from '@/utils/sessionUser';
import { revalidatePath } from 'next/cache';

export async function messageRead(messageId) {
  try {
    await connectDB();
    const getSessionUser = await sessionUser();

    if (!getSessionUser || !getSessionUser.userId) {
      throw new Error('User ID not found');
    }

    const { userId } = getSessionUser;

    const message = await Message.findById(messageId);

    if (!message) throw new Error('Message not found');

    if (message.recipient.toString() !== userId) {
      throw new Error('Unauthorized');
    }

    message.read = !message.read;

    revalidatePath('/messages', 'page');

    await message.save();

    return message.read;
  } catch (err) {
    return { error: err.message };
  }
}
