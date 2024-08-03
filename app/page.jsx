import Hero from '@/components/Hero';
import InfoBoxes from '@/components/Home/Info/InfoBoxes';
import HomeProperties from '@/components/Home/HomeProperties';

const Homepage = () => {
  return (
    <div>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </div>
  );
};

export default Homepage;
