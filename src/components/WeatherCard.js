import React from 'react';
import { WiHumidity, WiStrongWind, WiThermometer, WiBarometer } from 'react-icons/wi';

const WeatherCard = ({ weatherData, forecast }) => {
  if (!weatherData) return null;

  const { main, weather, wind, name } = weatherData;

  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const getForecastDays = () => {
    if (!forecast) return [];
    
    const dailyData = {};
    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyData[date]) {
        dailyData[date] = item;
      }
    });
    
    return Object.values(dailyData).slice(0, 5);
  };

  return (
    <div className="weather-display-container">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h2 className="card-title">{name}</h2>
              <div className="current-conditions">
                <img
                  src={getWeatherIcon(weather[0].icon)}
                  alt={weather[0].description}
                  className="weather-icon"
                />
                <div>
                  <div className="temperature">{Math.round(main.temp)}°C</div>
                  <p className="weather-description">{weather[0].description}</p>
                </div>
              </div>
              <div className="weather-details">
                <div className="detail-item">
                  <WiThermometer className="detail-icon" />
                  <div>
                    <span className="detail-label">Feels like</span>
                    <span className="detail-value">{Math.round(main.feels_like)}°C</span>
                  </div>
                </div>
                <div className="detail-item">
                  <WiHumidity className="detail-icon" />
                  <div>
                    <span className="detail-label">Humidity</span>
                    <span className="detail-value">{main.humidity}%</span>
                  </div>
                </div>
                <div className="detail-item">
                  <WiStrongWind className="detail-icon" />
                  <div>
                    <span className="detail-label">Wind Speed</span>
                    <span className="detail-value">{wind.speed} m/s</span>
                  </div>
                </div>
                <div className="detail-item">
                  <WiBarometer className="detail-icon" />
                  <div>
                    <span className="detail-label">Pressure</span>
                    <span className="detail-value">{main.pressure} hPa</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="forecast-section">
                <h4 className="forecast-title">5-Day Forecast</h4>
                <div className="forecast-items">
                  {getForecastDays().map((day, index) => (
                    <div key={index} className="forecast-item">
                      <p className="day-name">
                        {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                      </p>
                      <img
                        src={getWeatherIcon(day.weather[0].icon)}
                        alt={day.weather[0].description}
                        className="forecast-icon"
                      />
                      <p className="forecast-temp">{Math.round(day.main.temp)}°C</p>
                      <p className="forecast-desc">{day.weather[0].description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;