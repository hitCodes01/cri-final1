"use client"
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { ScenarioType, MapType } from "./types";

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

interface ForecastDashboardProps {
  data: WeatherData;
  scenario: ScenarioType;
  mapType: MapType;
}

const ForecastDashboard: React.FC<ForecastDashboardProps> = ({ data, scenario, mapType }) => {
  const getForecastData = () => {
    switch (scenario) {
      case "short":
        return data.forecast.short_term_forecast;
      case "medium":
        return data.forecast.medium_term_forecast;
      case "long":
        return data.forecast.long_term_forecast;
      default:
        return [];
    }
  };

  const formatXAxisTick = (value: string) => {
    if (scenario === "short") {
      // For hourly data, show time only
      const date = new Date(value);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      // For daily data, show date in short format
      return value.split("-").slice(1).join("/"); // Converts YYYY-MM-DD to MM/DD
    }
  };

  const renderTemperatureChart = () => {
    const forecastData = getForecastData();
    const tempKey = scenario === "short" ? "temperature" : "avg_temperature";
    
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={forecastData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey={scenario === "short" ? "datetime" : "date"}
            tick={{ fontSize: 12 }}
            interval={scenario === "short" ? 4 : 0} // Show fewer ticks for hourly data
            tickFormatter={formatXAxisTick}
          />
          <YAxis 
            label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            labelFormatter={(label) => scenario === "short" ? new Date(label).toLocaleString() : label}
            formatter={(value) => [`${value}°C`, 'Temperature']}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey={tempKey}
            stroke="#ff4444"
            strokeWidth={2}
            dot={{ r: 3 }}
            name="Temperature"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderPrecipitationChart = () => {
    const forecastData = getForecastData();
    
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={forecastData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey={scenario === "short" ? "datetime" : "date"}
            tick={{ fontSize: 12 }}
            interval={scenario === "short" ? 4 : 0}
            tickFormatter={formatXAxisTick}
          />
          <YAxis 
            label={{ value: 'Precipitation (mm)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            labelFormatter={(label) => scenario === "short" ? new Date(label).toLocaleString() : label}
            formatter={(value) => [`${value} mm`, 'Precipitation']}
          />
          <Legend />
          <Bar
            dataKey="precipitation_mm"
            fill="#4682b4"
            name="Precipitation"
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderExtremeWeatherChart = () => {
    const forecastData = getForecastData();
    
    // Create derived data for visualization
    const conditionData = forecastData.map(item => {
      const condition = item.condition || "Normal";
      return {
        ...item,
        isExtreme: condition !== "Normal" ? 1 : 0,
        conditionType: condition
      };
    });
    
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={conditionData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey={scenario === "short" ? "datetime" : "date"}
            tick={{ fontSize: 12 }}
            interval={scenario === "short" ? 2 : 0}
            tickFormatter={formatXAxisTick}
          />
          <YAxis 
            label={{ value: 'Extreme Weather', angle: -90, position: 'insideLeft' }}
            ticks={[0, 1]}
            tickFormatter={(value) => value === 1 ? "Yes" : "No"}
          />
          <Tooltip 
            labelFormatter={(label) => scenario === "short" ? new Date(label).toLocaleString() : label}
            formatter={(value, name, props) => [
              props.payload.conditionType,
              'Weather Condition'
            ]}
          />
          <Legend />
          <Bar
            dataKey="isExtreme"
            fill="#ff8c00"
            name="Extreme Weather"
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const chartTitle = () => {
    const timeframe = scenario === "short" ? "Hourly" : scenario === "medium" ? "Daily" : "Long-Term";
    const chartType = mapType === "temperature" ? "Temperature" : 
                      mapType === "precipitation" ? "Precipitation" : 
                      "Extreme Weather";
    return `${timeframe} ${chartType} Forecast - ${data.city}`;
  };

  const renderChartByType = () => {
    switch (mapType) {
      case "temperature":
        return renderTemperatureChart();
      case "precipitation":
        return renderPrecipitationChart();
      case "extreme-weather":
        return renderExtremeWeatherChart();
      default:
        return renderTemperatureChart();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {chartTitle()}
        </CardTitle>
        <CardDescription>
          {scenario === "short" 
            ? "48-hour hourly forecast" 
            : scenario === "medium" 
              ? "Daily forecast for next week" 
              : "Extended forecast"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        {renderChartByType()}
      </CardContent>
    </Card>
  );
};

export default ForecastDashboard;