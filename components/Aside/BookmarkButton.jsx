import { FaRegBookmark } from 'react-icons/fa';

const BookmarkButton = ({ property }) => {
  return (
    <button className='bg-blue-500 hover:bg-blue-600 text-white font-medium w-full mr-4 py-2 px-4 rounded-full flex items-center justify-center'>
      <FaRegBookmark className='mr-2' /> Bookmark
    </button>
  );
};

export default BookmarkButton;
