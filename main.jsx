import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const translations = {
  en: {
    search: "Search city...",
    temperature: "Temperature",
    humidity: "Humidity",
    wind: "Wind Speed",
    pressure: "Pressure",
    theme: "Toggle Theme",
    language: "Language",
    notFound: "City not found",
    loading: "Loading...",
  },
  ru: {
    search: "Поиск города...",
    temperature: "Температура",
    humidity: "Влажность",
    wind: "Скорость ветра",
    pressure: "Давление",
    theme: "Сменить тему",
    language: "Язык",
    notFound: "Город не найден",
    loading: "Загрузка...",
  },
  fr: {
    search: "Rechercher une ville...",
    temperature: "Température",
    humidity: "Humidité",
    wind: "Vitesse du vent",
    pressure: "Pression",
    theme: "Changer de thème",
    language: "Langue",
    notFound: "Ville non trouvée",
    loading: "Chargement...",
  },
  de: {
    search: "Stadt suchen...",
    temperature: "Temperatur",
    humidity: "Luftfeuchtigkeit",
    wind: "Windgeschwindigkeit",
    pressure: "Luftdruck",
    theme: "Thema wechseln",
    language: "Sprache",
    notFound: "Stadt nicht gefunden",
    loading: "Laden...",
  },
};

const WeatherApp = () => {
  const [city, setCity] = useState("Moscow");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("ru");

  const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your OpenWeatherMap API key

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(translations[language].notFound);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} transition-colors duration-300`}>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{translations[language].search}</h1>
          <div className="flex space-x-4">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded p-2"
            >
              <option value="ru">Русский</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
            <button
              onClick={toggleTheme}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              {translations[language].theme}
            </button>
          </div>
        </div>
        <form onSubmit={handleSearch} className="mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={translations[language].search}
            className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
          >
            {translations[language].search}
          </button>
        </form>
        {loading && <p>{translations[language].loading}</p>}
        {error && <p className="text-red-500">{error}</p>}
        {weather && !loading && (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">{weather.name}</h2>
            <p>{translations[language].temperature}: {weather.main.temp}°C</p>
            <p>{translations[language].humidity}: {weather.main.humidity}%</p>
            <p>{translations[language].wind}: {weather.wind.speed} m/s</p>
            <p>{translations[language].pressure}: {weather.main.pressure} hPa</p>
          </div>
        )}
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<WeatherApp />);
