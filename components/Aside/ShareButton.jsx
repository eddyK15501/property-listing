import { LuShare2 } from 'react-icons/lu';

const ShareButton = ({ property }) => {
  return (
    <button className='bg-rose-500 hover:bg-rose-600 text-white font-medium w-full py-2 px-4 rounded-xl flex items-center justify-center'>
      <LuShare2 className='mr-2' /> Share Property
    </button>
  );
};

export default ShareButton;
