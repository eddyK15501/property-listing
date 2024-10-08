import Image from 'next/image';
import connectDB from '@/config/connection';
import Property from '@/models/Property';
import { sessionUser } from '@/utils/sessionUser';
import defaultProfile from '@/assets/images/profile.png';
import ProfileProperties from '@/components/Property/ProfileProperties';
import convertToSerializable from '@/utils/convert';

const ProfilePage = async () => {
  await connectDB();

  const getSessionUser = await sessionUser();

  const { userId } = getSessionUser;

  if (!userId) {
    throw new Error('User ID not found.');
  }

  const properties = await Property.find({ owner: userId }).lean();
  // console.log(properties);

  // Convert properties data to be passed from "this" Server component, down to "child" Client component
  const convertedProperties = properties.map(convertToSerializable);
  // console.log(convertedProperties);

  return (
    <section className='bg-blue-50 pb-8'>
      <div className='container m-auto py-24 text-center md:text-start'>
        <div className='bg-white px-10 pt-8 pb-16 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-2xl font-semibold mb-4'>Your Profile</h1>
          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/4 mx-20 mt-10 mb-20 md:mb-0'>
              <div className='mb-6'>
                <Image
                  className='w-32 md:w-48 rounded-full mx-auto md:mx-0'
                  src={getSessionUser.user.image || defaultProfile}
                  alt='user-profile-image'
                  width={150}
                  height={150}
                />
              </div>
              <h2 className='text-xl mb-4'>
                <span className='font-bold block'>Name: </span> {getSessionUser.user.name}
              </h2>
              <h2 className='text-xl'>
                <span className='font-bold block'>Email: </span> {getSessionUser.user.email}
              </h2>
            </div>
            <div className='md:w-3/4 md:pl-4'>
              <h2 className='text-xl font-semibold mb-4'>Listings:</h2>
              {convertedProperties.length === 0 ? <p className='text-center'>No Properties Listed.</p> : (
                <ProfileProperties userProperties={convertedProperties} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
