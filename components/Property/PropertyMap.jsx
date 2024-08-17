'use client';
import { useState, useEffect } from 'react';
import { setDefaults, fromAddress } from 'react-geocode';

const PropertyMap = ({ property }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: 'en',
    region: 'us',
  });

  useEffect(() => {
    const fetchCoordinate = async () => {
      try {
        const response = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );

        if (response.results.length === 0) {
          setError(true);
          return;
        }

        console.log(response);
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinate();
  }, []);

  return <div>PropertyMap</div>;
};

export default PropertyMap;
