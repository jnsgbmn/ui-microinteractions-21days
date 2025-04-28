import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-500 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <button
        onClick={toggleTheme}
        className={`relative flex items-center w-16 h-8 p-1  rounded-full transition-colors duration-500 ${isDarkMode ? "bg-purple-500" : "bg-yellow-300"}`}
      >
        {/* Sun Icon - visible only in Light Mode */}
        {!isDarkMode && (
          <div className="absolute left-1 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center  rounded-full bg-white">
            <SunIcon className="h-5 w-5 text-yellow-700" />
          </div>
        )}

        {/* Moon Icon - visible only in Dark Mode */}
        {isDarkMode && (
          <div className="absolute top-1/2 transform -translate-y-1/2 translate-x-8 w-6 h-6 flex items-center justify-center rounded-full bg-white transition-all duration-300">
            <MoonIcon className="h-4 w-4 text-purple-700" />
          </div>
        )}
      </button>

      <h1 className="mt-6 text-2xl font-bold">
        {isDarkMode ? "Dark" : "Light"} Mode
      </h1>
    </div>
  );
}
