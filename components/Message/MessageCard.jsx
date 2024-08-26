'use client';
import { useState } from 'react';
import { messageRead } from '@/app/actions/messageRead';
import { messageDelete } from '@/app/actions/messageDelete';
import { useContextProvider } from '@/context/GlobalContext';
import { toast } from 'react-toastify';

const MessageCard = ({ message }) => {
  const { setUnreadCount } = useContextProvider();

  const [markRead, setMarkRead] = useState(message.read);
  const [deleted, setDeleted] = useState(false);

  const handleReadClick = async () => {
    const read = await messageRead(message._id);

    setMarkRead(read);
    setUnreadCount((prev) => (read ? prev - 1 : prev + 1));
    toast.success(`Marked As ${read ? 'Read' : 'New'}`);
  };

  const handleDeleteClick = async () => {
    await messageDelete(message._id);

    setDeleted(true);
    setUnreadCount((prev) => (markRead ? prev : prev - 1));
    toast.success('Message Deleted');
  };

  if (deleted) {
    return <p>Deleted</p>
  }

  return (
    <div
      className={`relative bg-white p-4 rounded-md shadow-md border border-gray-200 ${
        markRead ? '!bg-blue-100' : ''
      }`}
    >
      {!markRead && (
        <p className='hidden absolute top-3 right-5 text-green-500 underline md:block'>
          New Message
        </p>
      )}
      <h2 className='text-xl mb-4'>
        <span className='font-bold'>Property Request:</span>{' '}
        {message.property.name}
      </h2>
      <p className='text-gray-700'>{message.body}</p>
      <div className='flex justify-center mt-4 sm:mt-0 sm:justify-between flex-wrap'>
        <ul className='mt-4'>
          <li>
            <span className='font-bold'>Reply Email:</span>{' '}
            <a href={`mailto:${message.email}`} className='text-blue-500'>
              {message.email}
            </a>
          </li>
          <li>
            <span className='font-bold'>Reply Phone:</span>{' '}
            <a href={`tel:${message.phone}`} className='text-blue-500'>
              {message.phone}
            </a>
          </li>
          <li>
            <span className='font-bold'>Received:</span>{' '}
            {new Date(message.createdAt).toLocaleString()}
          </li>
        </ul>
        <div className='self-end'>
          <button
            onClick={handleReadClick}
            className='w-[130px] mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-400'
          >
            {markRead ? 'Mark As New' : 'Mark As Read'}
          </button>
          <button
            onClick={handleDeleteClick}
            className='w-[130px] mt-4 bg-rose-500 text-white py-1 px-3 rounded-md hover:bg-rose-400'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
