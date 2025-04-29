import React, { useState, useEffect } from 'react';
import { IconSun, IconDroplets, IconCloudRain, IconWind } from '@tabler/icons-react';

const WeatherWidget = ({ isDarkMode }) => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    function getUvLevel(value) {
        if (value < 3) return 'Low';
        if (value < 6) return 'Moderate';
        if (value < 8) return 'High';
        if (value < 11) return 'Very High';
        return 'Extreme';
    }

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const apiKey = 'd3e35e319cbceadd9fff17ee46074244'; // Replace with your OpenWeatherMap API key
                const location = 'Tokyo'; // Replace with desired location
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const data = await response.json();
                setWeather(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchWeather();
    }, []);

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    if (!weather) {
        return <div className="text-gray-500">Loading...</div>;
    }

    return (

        <div
            className={`p-6 w-80 shadow-xl space-y-4 rounded-4xl backdrop-blur-lg transition-colors duration-500 ${isDarkMode ? "bg-white bg-opacity-40 text-white" : "bg-black bg-opacity-70 text-black"
                }`}
        >
            <div className="text-center flex flex-row items-center justify-between space-x-4">
                <h2 className={`text-5xl font-semibold ${isDarkMode ? "text-black" : "text-white"}`}>
                    {weather.name}
                </h2>

                <div className={`text-5xl font-light ${isDarkMode ? "text-black" : "text-white"}`}>
                    {Math.round(weather.main.temp)}
                    <span className="text-sm align-super">°C</span>
                </div>
            </div>
            <p className={`text-xs ${isDarkMode ? "text-black" : "text-white"}`}>
                H: {Math.round(weather.main.temp_max)}° L: {Math.round(weather.main.temp_min)}° &nbsp;
                {new Date(weather.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-opacity-25  rounded-lg p-3  space-x-2">
                    <div className='flex flex-row items-center'>
                        <IconWind className={`h-6 w-6 ${isDarkMode ? "text-black" : "text-white"}`} />
                        &nbsp;
                        <p className={`font-medium ${isDarkMode ? "text-black" : "text-white"}`}>Wind</p>
                    </div>
                    <p className={`text-xs ${isDarkMode ? "text-black" : "text-white"}`}>
                        {weather.wind.speed} km/h
                    </p>
                </div>

                <div className="bg-opacity-25  rounded-lg p-3  space-x-2">
                    <div className='flex flex-row items-center'>
                        <IconDroplets className={`h-6 w-6 ${isDarkMode ? "text-black" : "text-white"}`} />
                        &nbsp;
                        <p className={` text-center  font-medium ${isDarkMode ? "text-black" : "text-white"}`}>Humidity</p>
                    </div>
                    <p className={`text-center text-xs ${isDarkMode ? "text-black" : "text-white"}`}>
                        {weather.main.humidity}%
                    </p>
                </div>
                <div className="bg-opacity-25  rounded-lg p-3  space-x-2">
                    <div className='flex flex-row items-center'>
                        <IconSun className={`h-6 w-6 ${isDarkMode ? "text-black" : "text-white"}`} />
                        &nbsp;
                        <p className={`font-medium ${isDarkMode ? "text-black" : "text-white"}`}>UV Index</p>
                    </div>
                    <p className={`text-center text-xs ${isDarkMode ? "text-black" : "text-white"}`}>
                        {weather.main.uvIndex !== undefined && weather.main.uvIndex !== null
                            ? `${weather.main.uvIndex} (${getUvLevel(weather.main.uvIndex)})`
                            : 'N/A'}
                    </p>

                </div>
                <div className="bg-opacity-25  rounded-lg p-3  space-x-2">
                    <div className='flex flex-row items-center'>
                        <IconCloudRain className={`h-6 w-6 ${isDarkMode ? "text-black" : "text-white"}`} />
                        &nbsp;
                        <p className={`font-medium ${isDarkMode ? "text-black" : "text-white"}`}>Rain
                        </p>
                    </div>
                    <p className={` text-center text-xs ${isDarkMode ? "text-black" : "text-white"}`}>
                        {weather.rain ? `${weather.rain['1h']} mm` : '0%'}
                    </p>
                </div>
            </div>
            <p className={`text-[10px] mt-2 text-center ${isDarkMode ? "text-black" : "text-white"}`}>
                {weather.weather[0].main === 'Rain'
                    ? 'Rainy weather sets the mood for a cozy indoor day.'
                    : weather.weather[0].main === 'Clear'
                        ? 'A clear sky invites you to enjoy the outdoors and soak up the sun.'
                        : weather.weather[0].main === 'Clouds'
                            ? 'Cloudy skies create a calm and serene atmosphere.'
                            : 'This scene captures the calm serenity of a cool, overcast day with a gentle breeze, perfect for a peaceful outdoor escape.'}
            </p>
        </div>

    );
};

export default WeatherWidget;