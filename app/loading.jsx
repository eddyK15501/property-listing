'use client';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};

const Loading = () => {
  return (
    <div className='min-h-[90vh]'>
      <ClipLoader
        color='#498dfc'
        size={150}
        cssOverride={override}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
};

export default Loading;
