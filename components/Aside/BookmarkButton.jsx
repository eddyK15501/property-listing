'use client';
import { toast } from 'react-toastify';
import { bookmarkProperty } from '@/app/actions/bookmarkProperty';
import { FaRegBookmark } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleBookmark = async () => {
    if (!userId) {
      toast.error('Sign-in to bookmark a listing');
    }

    const response = await bookmarkProperty(property._id);

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success(response.message);
  };

  return (
    <button
      className='bg-blue-500 hover:bg-blue-600 text-white font-medium w-full mr-4 py-2 px-4 rounded-full flex items-center justify-center'
      onClick={handleBookmark}
    >
      <FaRegBookmark className='mr-2' /> Bookmark
    </button>
  );
};

export default BookmarkButton;
