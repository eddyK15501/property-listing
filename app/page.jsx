import Hero from '@/components/Hero';
import InfoBoxes from '@/components/Home/Info/InfoBoxes';
import HomeProperties from '@/components/Home/HomeProperties';
import connectDB from '@/config/connection';

const Homepage = () => {
  connectDB();
  
  return (
    <div>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </div>
  );
};

export default Homepage;
