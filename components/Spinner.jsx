'use client';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};

const Spinner = () => {
  return (
    <ClipLoader
      color='#498dfc'
      size={150}
      cssOverride={override}
      aria-label='Spinner'
      data-testid='spinner'
    />
  );
};

export default Spinner;
