import React from 'react';

const WeatherInfo = ({ data }) => {
  const { name, sys, weather, main, wind, temperatureC } = data;

  return (
    <div className="card SC">
      <div className="card-body">
        <h3 className="card-title">
          {name}, {sys.country}
        </h3>
        <p className="card-text">{weather[0].description}</p>
        <h1 className="display-4">{temperatureC.toFixed(2)}°C / {main.temp}°F</h1>
        <p className="card-text">
          Real feel: {main.feels_like}°F <br />
          Humidity: {main.humidity}% <br />
          Wind: {wind.speed} mph
        </p>
        <div className="row">
          <div className="col-md-6">
            <h5>Sunrise</h5>
            <p>{new Date(sys.sunrise * 1000).toLocaleTimeString()}</p>
          </div>
          <div className="col-md-6">
            <h5>Sunset</h5>
            <p>{new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
