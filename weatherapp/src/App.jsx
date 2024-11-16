import { useState, useEffect } from 'react';
import './App.css';

const api = {
  "X-RapidAPI-Key": '9941511e24mshd85cb87ed7da9f6p161bccjsn6c205af79d0e',
  "X-RapidAPI-Host": "open-weather13.p.rapidapi.com"
};

function App() {
  const [search, setSearch] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = (city) => {
    fetch(`https://open-weather13.p.rapidapi.com/city/${city}/EN`, {
      method: "GET",
      headers: api
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
        setSearch('');
        console.log(data);
      })
      .catch(error => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    // Fetch the weather for Lucknow when the app loads
    fetchWeather("Lucknow");
  }, []);

  const searchPressed = () => {
    if (!search) return; 
    fetchWeather(search);
  };

  const convertToTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  };

  return (
    <div className="App">
      <h1>Welcome to Forecastify</h1>

      {/* Search Bar */}
      <div className="Search-bar">
        <input
          className="search-box"
          type="text"
          placeholder="Enter your city"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="Search-button" onClick={searchPressed}>Search</button>
      </div>

      {weatherData ? (
        <div className="weatherData">
          <div className="main-info">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              className="weather-icon"
            />
            <p className="location">{weatherData.name}, {weatherData.sys.country}</p>
            <p className="temprature">
              {Math.round(weatherData.main.temp)}°C {/* / {Math.round((weatherData.main.temp * 9/5) + 32)°F */}
            </p>
            <p className='description'>{weatherData.weather[0].description}</p>
          </div>

          <div className="addition-info">
            <p><i className="fas fa-wind"></i> Wind Speed: {weatherData.wind.speed} m/s</p>
            <p><i className="fas fa-tint"></i> Humidity: {weatherData.main.humidity}%</p>
            <p><i className="fas fa-compress-arrows-alt"></i> Pressure: {weatherData.main.pressure} hPa</p>
            <p><i className="fas fa-sun"></i> Sunrise: {convertToTime(weatherData.sys.sunrise)}</p>
            <p><i className="fas fa-moon"></i> Sunset: {convertToTime(weatherData.sys.sunset)}</p>
          </div>
        </div>
      ) : (
        <p className="weather-result">Enter a city to get the weather data</p>
      )}
    </div>
  );
}

export default App;
