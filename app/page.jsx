import Hero from '@/components/Hero';
import InfoBoxes from '@/components/Home/Info/InfoBoxes';
import HomeProperties from '@/components/Home/HomeProperties';

const Homepage = () => {
  return (
    <div className='mb-24'>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </div>
  );
};

export default Homepage;
