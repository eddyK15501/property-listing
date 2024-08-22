'use server';
import connectDB from '@/config/connection';
import Message from '@/models/Message';
import { sessionUser } from '@/utils/sessionUser';

export async function addMessage(formData) {
  try {
    await connectDB();

    const getSessionUser = await sessionUser();

    if (!getSessionUser || !getSessionUser.userId) {
      throw new Error('User ID is required');
    }

    const { userId } = getSessionUser;

    const recipient = formData.get('recipient');

    if (userId === recipient) {
      return { error: 'Cannot send a message to yourself' };
    }

    const newMessage = new Message({
      sender: userId,
      recipient,
      property: formData.get('property'),
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      body: formData.get('body'),
    });

    await newMessage.save();

    return { submitted: true };
  } catch (err) {
    return { error: err.message };
  }
}
