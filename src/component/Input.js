import React from 'react';
import { useState } from 'react';
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';

function Input({ setQuery, units, setUnits }) {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState('metric');

  const handleSearch = () => {
    if (city !== '') setQuery({ q: city });
    setCity('');
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({ lat: lat, lon: lon });
      });
    }
  };

  const handleUnitsChanged = (e) => {
    const selectedUnits = e.currentTarget.name;

    if (units !== selectedUnits) setUnits(selectedUnits);
    setTemperature(selectedUnits);
  };

  return (
    <div className='flex flex-row justify-center my-6  '>
      <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
        <input
          type='text'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className='text-xl font-light p-2 w-full shadow-xl focus:outline-none  placeholder: lowercase'
          placeholder='Search location...'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <UilSearch
          size={25}
          className={`text-white cursor-pointer transition ease-out hover:scale-125  `}
          onClick={handleSearch}
        />
        <UilLocationPoint
          size={25}
          className='text-white cursor-pointer transition ease-out hover:scale-125'
          onClick={handleLocation}
        />
      </div>

      <div className='flex fle-row w-1/4 items-center justify-center'>
        <button
          name='metric'
          className={`text-white text-xl   transition ease-out hover:scale-125  ${
            temperature === 'metric'
              ? 'font-bold text-4xl'
              : 'font-light text-xl'
          }`}
          onClick={handleUnitsChanged}
        >
          &deg;C
        </button>
        <p className='text-white text-xl mx-1'>|</p>
        <button
          name='imperial'
          className={`text-white    transition ease-out hover:scale-125  ${
            temperature === 'imperial'
              ? 'font-bold text-4xl'
              : 'font-light text-xl'
          }`}
          onClick={handleUnitsChanged}
        >
          &deg;F
        </button>
      </div>
    </div>
  );
}

export default Input;
