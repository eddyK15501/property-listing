'use client';
import { useState, useEffect } from 'react';
import { setDefaults, fromAddress } from 'react-geocode';

const PropertyMap = ({ property }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [viewState, setViewState] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 10,
  });

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

        const { lat, lng } = response.results[0].geometry.location;
        setLatitude(lat);
        setLongitude(lng);
        setViewState({ ...viewState, latitude: lat, longitude: lng });
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinate();
  }, []);

  if (loading) return <h3>Loading...</h3>;

  if (error) return <div className='text-xl'>Location Not Found</div>;

  return <div>Latitude: {latitude}, Longitude: {longitude}</div>;
};

export default PropertyMap;
