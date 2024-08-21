import connectDB from '@/config/connection';
import Property from '@/models/Property';
import { convertToSerializable } from '@/utils/convert';

const SearchResultsPage = async ({
  searchParams: { location, propertyType },
}) => {
  await connectDB();
  const locationPattern = new RegExp(location, 'i');

  let dbQuery = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { 'location.street': locationPattern },
      { 'location.city': locationPattern },
      { 'location.state': locationPattern },
      { 'location.zipcode': locationPattern },
    ],
  };

  if (propertyType !== 'All' && propertyType) {
    const typePattern = new RegExp(propertyType, 'i');
    dbQuery.type = typePattern;
  }

  console.log(dbQuery);

  return (
    <div>
      SearchResultsPage
    </div>
  );
};

export default SearchResultsPage;
