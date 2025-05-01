import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import WeatherWidget from "@/components/landing/WeatherWidget";
import FlightTrackingWidget from "@/components/landing/FlightTrackingWidget";

export default function Theme() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`h-screen transition-colors duration-500 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`relative flex items-center w-16 h-8 p-1 rounded-full transition-colors duration-500 ${isDarkMode ? "bg-purple-500" : "bg-yellow-300"}`}
      >
        {!isDarkMode ? (
          <div className="absolute left-1 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-white">
            <SunIcon className="h-5 w-5 text-yellow-700" />
          </div>
        ) : (
          <div className="absolute top-1/2 transform -translate-y-1/2 translate-x-8 w-6 h-6 flex items-center justify-center rounded-full bg-white transition-all duration-300">
            <MoonIcon className="h-4 w-4 text-purple-700" />
          </div>
        )}
      </button>

      {/* Widgets Section */}
      <div className="min-h-screen flex flex-row items-center justify-center space-x-8">
        <FlightTrackingWidget
          isDarkMode={isDarkMode}
          flightNumber="FL266"
          seat="26A"
        />
        <WeatherWidget
          isDarkMode={isDarkMode}
          location="Tokyo"
        />
      </div>
    </div>
  );
}