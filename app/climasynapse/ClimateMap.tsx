"use client"
import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapType } from "./types";

// Updated types to match the new data format
interface HourlyDataPoint {
  datetime: string;
  temperature?: number;
  precipitation_mm?: number;
  condition?: string;
}

interface DailyDataPoint {
  date: string;
  avg_temperature?: number;
  precipitation_mm?: number;
  condition?: string;
}

interface WeatherData {
  city: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  forecast: {
    short_term_forecast: HourlyDataPoint[];
    medium_term_forecast: DailyDataPoint[];
    long_term_forecast: DailyDataPoint[];
  };
}

interface ClimateMapProps {
  data: WeatherData;
  mapType: MapType;
}

const ClimateMap: React.FC<ClimateMapProps> = ({ data, mapType }) => {
  // Get current values based on the first entry in short-term forecast
  const getCurrentValues = () => {
    const currentData = data.forecast.short_term_forecast[0];
    
    if (!currentData) return { temperature: 0, precipitation: 0, condition: "Normal" };
    
    return {
      temperature: currentData.temperature || 0,
      precipitation: currentData.precipitation_mm || 0,
      condition: currentData.condition || "Normal"
    };
  };

  const currentValues = getCurrentValues();
  
  // Color functions for different map types
  const getTemperatureColor = (temperature: number) => {
    if (temperature > 30) return "#ff4444"; // Hot (red)
    if (temperature > 25) return "#ff8c00"; // Warm (orange)
    if (temperature > 20) return "#ffd700"; // Mild (yellow)
    if (temperature > 10) return "#00ff00"; // Cool (green)
    if (temperature > 0) return "#add8e6";  // Cold (light blue)
    return "#0000ff";                       // Very cold (blue)
  };
  
  const getPrecipitationColor = (precipitation: number) => {
    if (precipitation > 20) return "#000080"; // Heavy rain (dark blue)
    if (precipitation > 10) return "#0000ff"; // Moderate rain (blue)
    if (precipitation > 5) return "#4169e1";  // Light rain (royal blue)
    if (precipitation > 1) return "#87ceeb";  // Very light rain (sky blue)
    if (precipitation > 0) return "#e0ffff";  // Trace precipitation (light cyan)
    return "#ffffff";                         // No precipitation (white)
  };
  
  const getExtremeWeatherColor = (condition: string) => {
    if (condition === "Normal") return "#00ff00"; // Normal (green)
    
    // Different extreme weather conditions
    if (condition.includes("storm")) return "#ff4500"; // Storm (orange red)
    if (condition.includes("hurricane") || condition.includes("tornado")) return "#8b0000"; // Hurricane/tornado (dark red)
    if (condition.includes("flood")) return "#0000cd"; // Flood (medium blue)
    if (condition.includes("heat")) return "#ff0000"; // Heat (red)
    if (condition.includes("snow") || condition.includes("blizzard")) return "#f0f8ff"; // Snow (alice blue)
    
    return "#ff8c00"; // Other extreme weather (dark orange)
  };
  
  // Get color and value based on selected map type
  const getMarkerProperties = () => {
    switch (mapType) {
      case "temperature":
        return {
          color: getTemperatureColor(currentValues.temperature),
          value: `${currentValues.temperature}°C`
        };
      case "precipitation":
        return {
          color: getPrecipitationColor(currentValues.precipitation),
          value: `${currentValues.precipitation} mm`
        };
      case "extreme-weather":
        return {
          color: getExtremeWeatherColor(currentValues.condition),
          value: currentValues.condition
        };
      default:
        return {
          color: "#ff4444",
          value: "N/A"
        };
    }
  };
  
  const markerProps = getMarkerProperties();

  return (
    <MapContainer 
      center={[data.coordinates.lat, data.coordinates.lon]} 
      zoom={5} 
      className="h-[500px] w-full rounded-lg shadow-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <CircleMarker
        center={[data.coordinates.lat, data.coordinates.lon]}
        radius={15}
        pathOptions={{
          fillColor: markerProps.color,
          color: "white",
          weight: 1,
          fillOpacity: 0.8,
        }}
      >
        <Popup>
          <div className="text-sm p-2">
            <p className="font-bold text-base mb-2">{data.city}</p>
            {mapType === "temperature" && (
              <p>Temperature: <span className="font-semibold">{currentValues.temperature}°C</span></p>
            )}
            {mapType === "precipitation" && (
              <p>Precipitation: <span className="font-semibold">{currentValues.precipitation} mm</span></p>
            )}
            {mapType === "extreme-weather" && (
              <p>Condition: <span className="font-semibold">{currentValues.condition}</span></p>
            )}
          </div>
        </Popup>
      </CircleMarker>
    </MapContainer>
  );
};

export default ClimateMap;