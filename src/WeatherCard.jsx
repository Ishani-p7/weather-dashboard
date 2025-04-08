export default function WeatherCard({ data }) {
    return (
      <div className="weather-card">
        <h2>{data.name}</h2>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].main}
        />
        <p>{data.weather[0].main}</p>
        <p>🌡 Temp: {data.main.temp}°C</p>
        <p>💧 Humidity: {data.main.humidity}%</p>
        <p>🌬 Wind: {data.wind.speed} km/h</p>
      </div>
    );
  }
  