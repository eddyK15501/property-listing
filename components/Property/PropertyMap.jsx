'use client';
import { useState, useEffect } from 'react';
import { setDefaults, fromAddress } from 'react-geocode';
import Map, { Marker } from 'react-map-gl';
import Spinner from '@/components/Spinner';
import 'mapbox-gl/dist/mapbox-gl.css';

const PropertyMap = ({ property }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [viewState, setViewState] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 13,
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

  if (loading) return <Spinner />;

  if (error)
    return (
      <div className='font-bold text-xl text-center'>Location Not Found</div>
    );

  return (
    <div className='map-container w-full'>
      {!loading && (
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          initialViewState={viewState}
          style={{ width: '100%', height: 500, borderRadius: '0.3rem' }}
          mapStyle='mapbox://styles/mapbox/streets-v11'
        >
          <Marker
            longitude={longitude}
            latitude={latitude}
            anchor='bottom'
            color='red'
          />
        </Map>
      )}
    </div>
  );
};

export default PropertyMap;
