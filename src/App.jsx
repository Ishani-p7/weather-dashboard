import { useEffect, useState } from "react";
import "./styles.css";
import WeatherCard from "./WeatherCard";
import ForecastCard from "./ForecastCard";
import Loader from "./loader";

const API_KEY = "6382a2392cfd8e15c1ee431e80e3ca80";

export default function App() {
  const [searchCity, setSearchCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState([]);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (res.ok) {
        setWeather(data);
        setHistory((prev) =>
          [city, ...prev.filter((c) => c !== city)].slice(0, 5)
        );
        fetchForecast(city);
      } else {
        setError("City not found or API error.");
        setWeather(null);
        setForecast([]);
      }
    } catch {
      setError("City not found or API error.");
      setWeather(null);
      setForecast([]);
    }
    setLoading(false);
  };

  const fetchForecast = async (city) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (res.ok) {
        const filtered = data.list.filter((_, i) => i % 8 === 0);
        setForecast(filtered);
      }
    } catch {
      console.error("Forecast fetch failed");
    }
  };

  const handleSearch = () => {
    if (searchCity.trim()) {
      fetchWeather(searchCity.trim());
      setSearchCity("");
    }
  };

  const handleRefresh = () => {
    if (weather?.name) fetchWeather(weather.name);
  };

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="container">
        <h1>Weather Dashboard</h1>

        <div className="controls">
          <input
            type="text"
            placeholder="Enter city name"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleRefresh}>🔁</button>
          <button onClick={toggleTheme}>
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>

        <div className="history">
          {history.map((city, i) => (
            <button key={i} onClick={() => fetchWeather(city)}>
              {city}
            </button>
          ))}
        </div>

        {loading && <Loader />}
        {error && <p className="error">{error}</p>}
        {weather && <WeatherCard data={weather} />}
        {forecast.length > 0 && (
          <div className="forecast-container">
            {forecast.map((f, i) => (
              <ForecastCard key={i} forecast={f} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
