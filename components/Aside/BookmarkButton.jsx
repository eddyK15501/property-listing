'use client';
import { useState, useEffect } from 'react';
import { bookmarkProperty } from '@/app/actions/bookmarkProperty';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(true);

  const handleBookmark = async () => {
    if (!userId) {
      toast.error('Sign-in to bookmark a listing');
    }

    const res = await bookmarkProperty(property._id);

    if (res.error) {
      return toast.error(res.error);
    }

    setIsBookmarked(res.isBookmarked);

    toast.success(res.message);
  };

  return !isBookmarked ? (
    <button
      className='bg-blue-500 hover:bg-blue-600 text-white font-medium w-full mr-4 py-2 px-4 rounded-xl flex items-center justify-center'
      onClick={handleBookmark}
    >
      <FaRegBookmark className='mr-2' /> Bookmark
    </button>
  ) : (
    <button
      className='bg-orange-500 hover:bg-orange-600 text-white font-medium w-full mr-4 py-2 px-4 rounded-xl flex items-center justify-center'
      onClick={handleBookmark}
    >
      <FaBookmark className='mr-2' /> Remove Bookmark
    </button>
  );
};

export default BookmarkButton;
