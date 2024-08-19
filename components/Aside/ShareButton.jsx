import { LuShare2 } from 'react-icons/lu';

const ShareButton = ({ property }) => {
  return (
    <button className='bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'>
      <LuShare2 className='mr-2.5 align-middle' /> Share Property
    </button>
  );
};

export default ShareButton;
