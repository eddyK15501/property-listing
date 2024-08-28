import React from 'react';
import InfoBox from './InfoBox';

const InfoBoxes = () => {
  return (
    <section>
      <div className='container-xl lg:container m-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 px-4 pb-8 text-center rounded-lg'>
          <InfoBox heading='For Renters' btnInfo={{ text: 'Browse Properties', link: '/properties' }}>
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>
          <InfoBox heading='For Owners' bgColor='bg-gray-100' btnInfo={{ text: 'Add Properties', link: '/properties/add' }}>
            List your properties and reach potential tenants. Register on
            Airbnb.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
