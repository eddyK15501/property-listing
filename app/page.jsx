import Hero from '@/components/Hero';
import InfoBoxes from '@/components/Home/Info/InfoBoxes';
import HomeProperties from '@/components/Home/HomeProperties';

const Homepage = () => {
  console.log(process.env.MONGODB_URI)
  console.log(process.env.PUBLIC_DOMAIN)
  console.log(process.env.PUBLIC_API_DOMAIN)

  return (
    <div>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </div>
  );
};

export default Homepage;
