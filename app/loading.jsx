'use client';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};

const Loading = () => {
  return (
    <ClipLoader
      color='#498dfc'
      size={150}
      cssOverride={override}
      aria-label='Loading Spinner'
      data-testid='loader'
    />
  );
};

export default Loading;
