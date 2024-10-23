import React, { useState } from 'react';
import './App.css';
import image from './image.jpg';

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = '25398ee16596d5616d60379108856281';

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok || !data.main) {
        throw new Error(data.message || 'Weather data not found');
      }

      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Weather Today</h1>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter a location"
      />
      <button onClick={fetchWeather} disabled={!location || loading}>
        {loading ? 'Fetching...' : 'Get Weather'}
      </button>

      {error && <p>{error}</p>}

      {weatherData && weatherData.main && (
        <div id="weatherInfo">
          <h2>Weather in {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;
