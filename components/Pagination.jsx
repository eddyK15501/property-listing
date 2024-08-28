import Link from 'next/link';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

const Pagination = ({ page, size, total }) => {
  const totalPages = Math.ceil(total / size);

  return (
    <section className='container flex gap-1 justify-center mx-auto items-center mt-16'>
      {page > 1 ? (
        <Link
          href={`/properties?page=${page - 1}`}
          className='w-[80px] flex justify-center items-center gap-1 mr-2 px-2 py-1 border border-gray-300 rounded hover:text-blue-400 hover:border-blue-400'
        >
          <GrFormPrevious />
          Prev
        </Link>
      ) : (
        <Link
          href={`/properties?page=${page - 1}`}
          className='pointer-events-none cursor-not-allowed text-gray-400 w-[80px] flex justify-center items-center gap-1 mr-2 px-2 py-1 border border-gray-300 rounded'
        >
          <GrFormPrevious />
          Prev
        </Link>
      )}
      <span className='mx-2'>
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Link
          href={`/properties?page=${page + 1}`}
          className='w-[80px] flex justify-center items-center gap-1 ml-2 px-2 py-1 border border-gray-300 rounded hover:text-blue-400 hover:border-blue-400'
        >
          Next
          <GrFormNext />
        </Link>
      ) : (
        <Link
          href={`/properties?page=${page + 1}`}
          className='pointer-events-none cursor-not-allowed text-gray-400 w-[80px] flex justify-center items-center gap-1 ml-2 px-2 py-1 border border-gray-300 rounded'
        >
          Next
          <GrFormNext />
        </Link>
      )}
    </section>
  );
};

export default Pagination;
