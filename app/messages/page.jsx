import connectDB from '@/config/connection';
import Message from '@/models/Message';
import convertToSerializable from '@/utils/convert';
import { sessionUser } from '@/utils/sessionUser';
import MessageCard from '@/components/Message/MessageCard';
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

  return (
    <section className='bg-blue-50 pb-6'>
      <div className='container m-auto py-24 max-w-6xl'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-2xl font-bold mb-6'>Your Messages</h1>
          <div className='space-y-4'>
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
