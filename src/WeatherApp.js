import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherInfo from './components/WeatherInfo';

const defaultCities = [
   'Mumbai',
  'Surat',
  'Ahmedabad',
 
];

const WeatherApp = () => {
  // const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [topWeatherData, setTopWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchTopWeatherData = async () => {
      try {
        const fetchedData = await Promise.all(
          defaultCities.map(async (city) => {
            const apiKey = '269bee098219815636150972f8539089';
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);
            return await response.json();
          })
        );
        setTopWeatherData(fetchedData);
      } catch (error) {
        console.error('Error fetching top weather data:', error);
      }
    };
    fetchTopWeatherData();
  }, []);

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setNotFound(false);
    try {
      const apiKey = '269bee098219815636150972f8539089';
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);
      const data = await response.json();
      if (response.ok) {
        setWeatherData([data]);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setNotFound(true);
    }
    setLoading(false);
  };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   const city = e.target.elements.city.value;
  //   fetchWeatherData(city);
  //   setQuery(city);
  // };

  return (
    
    <div className="container">
      <h1 className="text-center my-4">Weather App</h1>
      <SearchBar fetchWeatherData={fetchWeatherData} />
      
      {loading && <div className="loading">Loading weather data...</div>}
      {!loading && notFound && <div className="not-found">No weather data found for.</div>}
      {!loading && weatherData.length > 0 && (
        <div className="search-results">
          <h2 className="my-4">Search Results</h2>
          <div className="row">
            {weatherData.map((data) => (
              <div key={data.id} className="col-md-4 mb-4">
                <WeatherInfo data={data} />
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="my-4">Top Cities Weather</h2>
      <div className="row">
        {topWeatherData.length > 0 ? (
          topWeatherData.map((data) => (
            <div key={data.id} className="col-md-4 mb-4">
              <WeatherInfo data={data} />
            </div>
          ))
        ) : (
          <p>No top cities weather data available.</p>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
