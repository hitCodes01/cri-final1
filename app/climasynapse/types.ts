"use client"

export type MapType = "temperature" | "precipitation" | "extreme-weather";
export type ScenarioType = "short" | "medium" | "long";

// Hourly data point for short-term forecasts
export interface HourlyDataPoint {
  datetime: string;
  temperature?: number;
  precipitation_mm?: number;
  condition?: string;
}

// Daily data point for medium and long-term forecasts
export interface DailyDataPoint {
  date: string;
  avg_temperature?: number;
  precipitation_mm?: number;
  condition?: string;
}

export interface ForecastData {
  short_term_forecast: HourlyDataPoint[];
  medium_term_forecast: DailyDataPoint[];
  long_term_forecast: DailyDataPoint[];
}

export interface WeatherData {
  city: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  forecast: ForecastData;
  regional_impact_analysis?: string;
  projected_climate_risks?: string; // Added this line
  alerts?: Array<{
    event: string;
    description: string;
  }>;
}