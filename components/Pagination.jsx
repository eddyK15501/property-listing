import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

const Pagination = ({ page, size, total }) => {
  const totalPages = Math.ceil(total / size);

  return (
    <section className='container flex gap-1 justify-center mx-auto items-center mt-16'>
      <a
        href='#'
        className='w-[80px] flex justify-center items-center gap-1 mr-2 px-2 py-1 border border-gray-300 rounded hover:text-blue-400 hover:border-blue-400'
      >
        <GrFormPrevious />
        Prev
      </a>
      <span className='mx-2'>
        Page {page} of {totalPages}
      </span>
      <a
        href='#'
        className='w-[80px] flex justify-center items-center gap-1 ml-2 px-2 py-1 border border-gray-300 rounded hover:text-blue-400 hover:border-blue-400'
      >
        Next
        <GrFormNext />
      </a>
    </section>
  );
};

export default Pagination;
