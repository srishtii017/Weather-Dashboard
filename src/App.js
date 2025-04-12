import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import { WiCloud } from 'react-icons/wi';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError(null);

      const weatherResponse = await fetch(`/api/weather/${city}`);
      const forecastResponse = await fetch(`/api/weather/forecast/${city}`);

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error('City not found. Please try another city name.');
      }

      const weatherResult = await weatherResponse.json();
      const forecastResult = await forecastResponse.json();

      setWeatherData(weatherResult);
      setForecast(forecastResult);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container py-5">
        <h1 className="text-center mb-4">
          <WiCloud className="me-2" />
          Weather Dashboard
        </h1>
        <p className="tagline">Your window to weather worldwide</p>
        
        <SearchBar onSearch={handleSearch} />
        
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : (
          weatherData && (
            <div className="mt-4">
              <WeatherCard 
                weatherData={weatherData}
                forecast={forecast}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App; 