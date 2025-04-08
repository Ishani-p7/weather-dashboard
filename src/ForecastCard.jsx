export default function ForecastCard({ forecast }) {
    const date = new Date(forecast.dt_txt);
    return (
      <div className="forecast-card">
        <p>{date.toLocaleDateString()}</p>
        <img
          src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
          alt={forecast.weather[0].main}
        />
        <p>{forecast.main.temp}°C</p>
        <p>{forecast.weather[0].main}</p>
      </div>
    );
  }
  