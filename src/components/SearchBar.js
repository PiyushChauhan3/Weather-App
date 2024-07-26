import React, { useState } from 'react';

const SearchBar = ({ fetchWeatherData }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeatherData(city);
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" form-inline d-flex align-item-center mb-4">
      <input
        type="text"
        className=" form form-control mr-2"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        name="city"
      />
      <button type="submit" className="btn btn-primary">Get Weather</button>
    </form>
  );
};

export default SearchBar;
