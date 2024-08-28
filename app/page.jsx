import Hero from '@/components/Hero';
import InfoBoxes from '@/components/Home/Info/InfoBoxes';
import HomeProperties from '@/components/Home/HomeProperties';
import FeaturedProperties from '@/components/Home/FeaturedProperties';

const Homepage = () => {
  return (
    <div className='mb-24'>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </div>
  );
};

export default Homepage;
