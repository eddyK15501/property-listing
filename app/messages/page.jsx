import connectDB from '@/config/connection';
import Message from '@/models/Message';
import convertToSerializable from '@/utils/convert';
import { sessionUser } from '@/utils/sessionUser';
import '@/models/Property';

const MessagesPage = async () => {
  await connectDB();

  const getSessionUser = await sessionUser();

  const { userId } = getSessionUser;

  const readMessages = await Message.find({ recipient: userId, read: true })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean();

  const unreadMessages = await Message.find({ recipient: userId, read: false })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean();

  const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
    const message = convertToSerializable(messageDoc);
    message.sender = convertToSerializable(messageDoc.sender);
    message.property = convertToSerializable(messageDoc.property);
    return message;
  });

  return <div>MessagesPage</div>;
};

export default MessagesPage;
