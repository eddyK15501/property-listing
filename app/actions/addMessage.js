'use server';
import connectDB from '@/config/connection';
import Message from '@/models/Message';
import { sessionUser } from '@/utils/sessionUser';

export async function addMessage(prevState, formData) {
  try {
    await connectDB();

    const getSessionUser = await sessionUser();

    if (!getSessionUser || !getSessionUser.userId) {
      throw new Error('User ID is required');
    }

    const { userId } = getSessionUser;

    const recipient = formData.get('recipient');

    if (userId === recipient) {
      return { error: 'You can not send a message to yourself. Try again.' };
    }

    const newMessage = new Message({
      sender: userId,
      recipient,
      property: formData.get('property'),
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      body: formData.get('message'),
    });

    await newMessage.save();

    return { submitted: true };
  } catch (err) {
    return { error: err.message };
  }
}
