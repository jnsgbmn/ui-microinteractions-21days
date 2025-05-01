import React, { useState, useEffect } from 'react';
import { IconPlane } from '@tabler/icons-react';

const FlightTrackingWidget = ({ isDarkMode, flightNumber, seat }) => {
    const [flightData, setFlightData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFlightData = async () => {
            try {
                const apiKey = ''; // Replace with your AviationStack API key
                const response = await fetch(
                    `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${flightNumber}`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch flight data');
                }
                const data = await response.json();
                if (data.data && data.data.length > 0) {
                    setFlightData(data.data[0]);
                } else {
                    throw new Error('Flight not found');
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchFlightData();
    }, [flightNumber]);

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    if (!flightData) {
        return <div className="text-gray-500">Loading...</div>;
    }

    const {
        departure,
        arrival,
        flight_status: status,
        airline,
    } = flightData;

    return (
        <div
            className={`p-4 w-96 rounded-3xl shadow-lg space-y-2 transition-colors duration-500 ${isDarkMode ? "bg-black bg-opacity-80 text-white" : "bg-[#f5f5dc] text-black"
                }`}
        >
            <div className={`text-center text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                FLIGHT TRACKING
            </div>

            <div className="flex justify-between items-center text-xs">
                <span className={`${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`}>{flightNumber}</span>
                <span className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{`SEAT ${seat}`}</span>
            </div>

            <div className="flex items-center justify-between mt-2">
                {/* Departure */}
                <div className="flex flex-col items-center">
                    <span className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>{departure.iata}</span>
                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{departure.scheduled}</span>
                </div>

                <div className="flex flex-col items-center">
                    <div className="flex items-center space-x-2">
                        <div className={`h-1 w-10 ${isDarkMode ? "bg-green-500" : "bg-green-400"}`}></div>
                        <IconPlane className={`h-5 w-5 ${isDarkMode ? "text-white" : "text-black"}`} />
                        <div className={`h-1 w-10 ${isDarkMode ? "bg-gray-500" : "bg-gray-400"}`}></div>
                    </div>
                    <span className={`text-xs ${isDarkMode ? "text-green-500" : "text-green-600"}`}>{status}</span>
                </div>

                <div className="flex flex-col items-center">
                    <span className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>{arrival.iata}</span>
                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{arrival.scheduled}</span>
                </div>
            </div>

            <div className="flex justify-between items-center mt-2 text-xs">
                <span className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{airline.name}</span>
                <div className="flex items-center space-x-1">
                    <div
                        className={`h-4 w-4 rounded-full flex items-center justify-center text-xs font-bold ${isDarkMode ? "bg-yellow-500 text-black" : "bg-yellow-400 text-black"
                            }`}
                    >
                        2
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightTrackingWidget;