import { useFormStatus } from 'react-dom';
import { RiMailSendLine } from 'react-icons/ri';

const SubmitMessageBtn = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center mt-5'
      type='submit'
      disabled={pending}
    >
      <RiMailSendLine className='mr-2 hidden lg:block' />{' '}
      {pending ? 'Sending...' : 'Send Message'}
    </button>
  );
};

export default SubmitMessageBtn;
