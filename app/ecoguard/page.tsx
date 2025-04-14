
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import "../styles/ecoguard.css";

// Define all types for API responses
interface Location {
  city: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface Pollutants {
  co: number;
  no: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  nh3: number;
}

interface AirQuality {
  aqi: number;
  quality_level: string;
  description: string;
  pollutants: Pollutants;
  timestamp: string;
}

interface WeatherConditions {
  temperature: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  wind_direction: number;
  weather_description: string;
  weather_icon: string;
  timestamp: string;
}

interface WaterQuality {
  overall_index: number;
  ph_level: number;
  turbidity: number;
  dissolved_oxygen: number;
  e_coli_presence: string;
  note: string;
}

interface Pollution {
  overall_index: number;
  noise_pollution: number;
  light_pollution: number;
  waste_management_index: number;
  radiation_levels: string;
  soil_pollution: string;
  note: string;
}

interface ReportSection {
  title: string;
  content: string;
}

interface Report {
  report_type: string;
  location: string;
  timestamp: string;
  sections: ReportSection[];
}

interface Alert {
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: string;
}

interface AlertResponse {
  location: Location;
  alert_type: string;
  alerts: Alert[];
  geocoded_from: string;
}

interface EnvironmentalData {
  location: Location;
  air_quality: AirQuality;
  weather_conditions: WeatherConditions;
  geocoded_from: string;
}

interface MonitoringData {
  location: Location;
  data_type: string;
  air_quality?: AirQuality;
  weather_conditions?: WeatherConditions;
  water_quality?: WaterQuality;
  pollution?: Pollution;
  timestamp?: string;
  geocoded_from: string;
}

interface ReportData {
  report_type: string;
  location: string;
  timestamp: string;
  sections: ReportSection[];
  geocoded_from: string;
}

interface AlertProps {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  onClose?: () => void;
}

// Cache interface for reports
interface ReportCache {
  [key: string]: {
    [reportType: string]: ReportData;
  };
}

// Alert component
function Alert({ type, title, message, onClose }: AlertProps) {
  const alertStyles = {
    success: {
      bg: "bg-green-50",
      text: "text-green-800",
      border: "border-green-300",
      icon: "✅",
    },
    error: {
      bg: "bg-red-50",
      text: "text-red-800",
      border: "border-red-300",
      icon: "❌",
    },
    info: {
      bg: "bg-blue-50",
      text: "text-blue-800",
      border: "border-blue-300",
      icon: "ℹ️",
    },
    warning: {
      bg: "bg-yellow-50",
      text: "text-yellow-800",
      border: "border-yellow-300",
      icon: "⚠️",
    },
  };

  const currentStyle = alertStyles[type] || alertStyles.info;

  return (
    <div
      className={`flex items-center gap-4 p-4 mb-4 rounded-lg border ${currentStyle.bg} ${currentStyle.border}`}
    >
      <span className={`text-2xl ${currentStyle.text}`}>{currentStyle.icon}</span>
      <div className="flex-grow">
        <p className={`font-bold ${currentStyle.text}`}>{title}</p>
        <p className={`text-sm ${currentStyle.text}`}>{message}</p>
      </div>
      {onClose && (
        <button
          className={`text-gray-400 hover:text-gray-600`}
          onClick={onClose}
        >
          ✖
        </button>
      )}
    </div>
  );
}

// AQI color coding helper
function getAQIColor(aqi: number) {
  switch(aqi) {
    case 1: return 'bg-green-500';
    case 2: return 'bg-green-300';
    case 3: return 'bg-yellow-300';
    case 4: return 'bg-orange-400';
    case 5: return 'bg-red-500';
    default: return 'bg-gray-300';
  }
}

// Weather Icon component
function WeatherIcon({ icon }: { icon: string }) {
  return (
    <img 
      src={`http://openweathermap.org/img/wn/${icon}@2x.png`} 
      alt="Weather icon" 
      className="w-12 h-12"
    />
  );
}

// Loading Spinner Component
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

// Enhanced Report Section Component with better formatting
function EnhancedReportSection({ section, index }: { section: ReportSection; index: number }) {
  // Different color schemes for sections to alternate
  const colorSchemes = [
    { 
      container: "bg-blue-50 border-blue-200", 
      title: "text-blue-800 bg-blue-100",
      icon: "💧"
    },
    { 
      container: "bg-green-50 border-green-200", 
      title: "text-green-800 bg-green-100",
      icon: "🌿"
    },
    { 
      container: "bg-purple-50 border-purple-200", 
      title: "text-purple-800 bg-purple-100",
      icon: "🔬"
    },
    { 
      container: "bg-amber-50 border-amber-200", 
      title: "text-amber-800 bg-amber-100",
      icon: "🔍"
    }
  ];

  const scheme = colorSchemes[index % colorSchemes.length];
  
  // Process the content with improved formatting
  const formatContent = () => {
    // Check if content has list items
    const hasList = section.content.includes('\n- ');
    
    // Replace all markdown and emojis with HTML
    let formatted = section.content
      // Format headings with different levels
      .replace(/# ([^\n]+)/g, '<h3 class="text-xl font-semibold mt-4 mb-2">$1</h3>')
      .replace(/## ([^\n]+)/g, '<h4 class="text-lg font-semibold mt-3 mb-2">$1</h4>')
      .replace(/### ([^\n]+)/g, '<h5 class="text-base font-semibold mt-2 mb-1">$1</h5>')
      
      // Format bold text
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      
      // Format emojis with larger size
      .replace(/(⚕️|🌆|📉|🌱|💧|🔬|🏭|⚠️|✅|❌|ℹ️|🌍)/g, '<span class="text-xl mr-1">$1</span>')
      
      // Handle paragraphs
      .replace(/\n\n/g, '</p><p class="mb-3">')
      
      // Handle list items (but don't wrap in <ul> yet)
      .replace(/- ([^\n]+)/g, '<li class="ml-5 mb-1">$1</li>');
    
    // Now handle lists properly
    if (hasList) {
      // Find all list item groups and wrap them in <ul> tags
      let parts = [];
      let currentPart = '';
      let inList = false;
      
      // Split by list items
      const lines = formatted.split('<li');
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        if (i === 0 && !line.includes('</li>')) {
          // First part before any list
          parts.push(line);
        } else if (line.includes('</li>')) {
          // This is a list item
          if (!inList) {
            // Start a new list
            parts.push('<ul class="list-disc my-3">');
            inList = true;
          }
          parts.push('<li' + line);
          
          // Check if the next line is not a list item
          if (i + 1 >= lines.length || !lines[i + 1].includes('</li>')) {
            parts.push('</ul>');
            inList = false;
          }
        } else {
          // Not a list item
          if (inList) {
            parts.push('</ul>');
            inList = false;
          }
          parts.push(line);
        }
      }
      
      formatted = parts.join('');
    }
    
    // Wrap everything in a paragraph if not already
    if (!formatted.startsWith('<p')) {
      formatted = '<p class="mb-3">' + formatted;
    }
    if (!formatted.endsWith('</p>')) {
      formatted = formatted + '</p>';
    }
    
    return formatted;
  };

  return (
    <div className={`mb-6 border rounded-lg overflow-hidden shadow-sm ${scheme.container}`}>
      <div className={`flex items-center px-4 py-3 ${scheme.title}`}>
        <span className="text-xl mr-2">{scheme.icon}</span>
        <h5 className="font-semibold">{section.title}</h5>
      </div>
      <div className="p-4 prose prose-sm max-w-none">
        <div 
          className="text-gray-800" 
          dangerouslySetInnerHTML={{ __html: formatContent() }}
        />
      </div>
    </div>
  );
}

// Main component
export default function EnvironmentalPage() {
  const [location, setLocation] = useState("London");
  const [selectedOption, setSelectedOption] = useState("air_quality");
  const [alertType, setAlertType] = useState("community");
  const [loading, setLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [environmentalData, setEnvironmentalData] = useState<EnvironmentalData | null>(null);
  const [monitoringData, setMonitoringData] = useState<MonitoringData | null>(null);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [alertData, setAlertData] = useState<AlertResponse | null>(null);
  
  // Report cache ref to persist between renders
  const reportCacheRef = useRef<ReportCache>({});
  const prevLocationRef = useRef<string>("");
  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ecogurad-backend.vercel.app/api';

  const options = [
    { id: "air_quality", name: "Air Quality" },
    { id: "water_quality", name: "Water Quality" },
    { id: "pollution", name: "Pollution" },
  ];

  const alerts = [
    { id: "community", name: "Community Alerts" },
    { id: "health_risk", name: "Health Risk Alerts" },
  ];

  // Color schemes for different data types
  const dataTypeColors = {
    air_quality: "text-blue-600 border-blue-600",
    water_quality: "text-teal-600 border-teal-600",
    pollution: "text-purple-600 border-purple-600"
  };

  // Get color scheme based on selected option
  const getDataTypeColorScheme = (optionId: string) => {
    return dataTypeColors[optionId as keyof typeof dataTypeColors] || "text-gray-600 border-gray-600";
  };

  // Fetch environmental data for the selected location
  async function fetchEnvironmentalData() {
    if (!location.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/environmental-data?location=${encodeURIComponent(location)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch environmental data');
      }
      
      const data = await response.json();
      setEnvironmentalData(data);
      
      // Reset report cache if location changed
      if (prevLocationRef.current !== location) {
        reportCacheRef.current = {};
        prevLocationRef.current = location;
      }
    } catch (err) {
      console.error('Error fetching environmental data:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }

  // Fetch monitoring data for the selected option
  async function fetchMonitoringData() {
    if (!location.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/monitoring/${selectedOption}?location=${encodeURIComponent(location)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to fetch ${selectedOption} data`);
      }
      
      const data = await response.json();
      setMonitoringData(data);
    } catch (err) {
      console.error(`Error fetching ${selectedOption} data:`, err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }

  // Fetch report data for the selected option with caching
  async function fetchReportData() {
    if (!location.trim()) return;
    
    // Check if report is in cache
    if (reportCacheRef.current[location] && reportCacheRef.current[location][selectedOption]) {
      setReportData(reportCacheRef.current[location][selectedOption]);
      return;
    }
    
    setReportLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/reports/${selectedOption}?location=${encodeURIComponent(location)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to fetch ${selectedOption} report`);
      }
      
      const data = await response.json();
      
      // Cache the report data
      if (!reportCacheRef.current[location]) {
        reportCacheRef.current[location] = {};
      }
      reportCacheRef.current[location][selectedOption] = data;
      
      setReportData(data);
    } catch (err) {
      console.error(`Error fetching ${selectedOption} report:`, err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setReportLoading(false);
    }
  }

  // Fetch alert data for the selected alert type
  async function fetchAlertData() {
    if (!location.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/alerts/${alertType}?location=${encodeURIComponent(location)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to fetch ${alertType} alerts`);
      }
      
      const data = await response.json();
      setAlertData(data);
    } catch (err) {
      console.error(`Error fetching ${alertType} alerts:`, err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }

  // Download environmental data
  async function downloadData() {
    if (!location.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // This will trigger a file download
      window.open(`${API_BASE_URL}/download?location=${encodeURIComponent(location)}&type=${selectedOption}`);
    } catch (err) {
      console.error('Error downloading data:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }

  // Effect to fetch initial data when the component mounts
  useEffect(() => {
    fetchEnvironmentalData();
    fetchAlertData();
  }, []);

  // Effect to fetch data when the selected option changes
  useEffect(() => {
    if (environmentalData) {
      fetchMonitoringData();
      // Reset report data to show loading state
      setReportData(null);
      fetchReportData();
    }
  }, [selectedOption, environmentalData]);

  // Effect to fetch alerts when the alert type changes
  useEffect(() => {
    if (environmentalData) {
      fetchAlertData();
    }
  }, [alertType, environmentalData]);

  // Handle location search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEnvironmentalData();
  };

  return (
    <div className="text-gray-900 font-sans">
      <Head>
        <title>EcoGuard - Environmental Monitoring & Health</title>
      </Head>

      {/* Hero Section */}
      <section className="relative hero-section bg-gradient-to-b from-blue-800 to-teal-500 text-white flex items-center justify-center p-6 py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">EcoGuard™ Environmental Monitoring</h1>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Discover real-time environmental insights and safeguard your community with comprehensive monitoring.
          </p>
          
          {/* Location Search Form */}
          <form 
            onSubmit={handleSearch}
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-2"
          >
            <input
              type="text"
              placeholder="Enter location (city, country)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-grow px-4 py-2 rounded-lg text-gray-800"
            />
            <Button 
              type="submit"
              disabled={loading || !location.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </form>
          
          {/* Location Display */}
          {environmentalData && (
            <div className="mt-6 text-white">
              <p className="text-xl">
                Currently viewing: {environmentalData.location.city}, {environmentalData.location.country}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Error Display */}
      {error && (
        <div className="max-w-4xl mx-auto mt-6 px-4">
          <Alert 
            type="error" 
            title="Error" 
            message={error}
            onClose={() => setError(null)}
          />
        </div>
      )}

      {/* Current Conditions Overview */}
      {environmentalData && (
        <section className="py-8 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-6">Current Environmental Conditions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Weather Card */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Weather</h3>
                  <WeatherIcon icon={environmentalData.weather_conditions.weather_icon} />
                </div>
                <p className="text-4xl font-bold mb-2">{environmentalData.weather_conditions.temperature}°C</p>
                <p className="text-gray-600 capitalize mb-4">{environmentalData.weather_conditions.weather_description}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Feels Like</p>
                    <p className="font-medium">{environmentalData.weather_conditions.feels_like}°C</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Humidity</p>
                    <p className="font-medium">{environmentalData.weather_conditions.humidity}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Wind</p>
                    <p className="font-medium">{environmentalData.weather_conditions.wind_speed} m/s</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Pressure</p>
                    <p className="font-medium">{environmentalData.weather_conditions.pressure} hPa</p>
                  </div>
                </div>
              </div>
              
              {/* Air Quality Card */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Air Quality</h3>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${getAQIColor(environmentalData.air_quality.aqi)}`}>
                    {environmentalData.air_quality.aqi}
                  </div>
                </div>
                <p className="text-2xl font-bold mb-2">{environmentalData.air_quality.quality_level}</p>
                <p className="text-gray-600 mb-4">{environmentalData.air_quality.description}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">PM2.5</p>
                    <p className="font-medium">{environmentalData.air_quality.pollutants.pm2_5} μg/m³</p>
                  </div>
                  <div>
                    <p className="text-gray-500">PM10</p>
                    <p className="font-medium">{environmentalData.air_quality.pollutants.pm10} μg/m³</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Ozone (O₃)</p>
                    <p className="font-medium">{environmentalData.air_quality.pollutants.o3} μg/m³</p>
                  </div>
                  <div>
                    <p className="text-gray-500">NO₂</p>
                    <p className="font-medium">{environmentalData.air_quality.pollutants.no2} μg/m³</p>
                  </div>
                </div>
              </div>
              
              {/* Timestamp Card */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Monitoring Information</h3>
                <p className="text-gray-600 mb-4">
                  Location data was geocoded from your search query: <span className="font-medium">{environmentalData.geocoded_from}</span>
                </p>
                <p className="text-gray-500 text-sm mb-2">Weather data time:</p>
                <p className="font-medium mb-4">{new Date(environmentalData.weather_conditions.timestamp).toLocaleString()}</p>
                <p className="text-gray-500 text-sm mb-2">Air quality data time:</p>
                <p className="font-medium">{new Date(environmentalData.air_quality.timestamp).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Interactive Monitoring Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Environmental Monitoring Dashboard</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Monitoring Options</h3>
              <ul className="space-y-4 mb-8">
                {options.map((option) => (
                  <li
                    key={option.id}
                    onClick={() => setSelectedOption(option.id)}
                    className={`p-4 cursor-pointer rounded-lg transition ${
                      selectedOption === option.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-blue-100"
                    }`}
                  >
                    {option.name}
                  </li>
                ))}
              </ul>
              
              <h3 className="text-xl font-semibold mb-4">Alert Types</h3>
              <ul className="space-y-4">
                {alerts.map((alert) => (
                  <li
                    key={alert.id}
                    onClick={() => setAlertType(alert.id)}
                    className={`p-4 cursor-pointer rounded-lg transition ${
                      alertType === alert.id
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-orange-100"
                    }`}
                  >
                    {alert.name}
                  </li>
                ))}
              </ul>
            </aside>

            <div className="w-full md:w-2/3 bg-white p-8 rounded-lg shadow-md">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <p className="text-gray-500">Loading data...</p>
                </div>
              ) : (
                <>
                  <div className={`border-b-2 mb-6 pb-2 ${getDataTypeColorScheme(selectedOption)}`}>
                    <h3 className="text-2xl font-bold">
                      {options.find(o => o.id === selectedOption)?.name} Report
                    </h3>
                  </div>
                  
                  {/* Monitoring Data Display */}
                  {monitoringData && (
                    <div className="mb-6">
                      {monitoringData.data_type === 'air_quality' && monitoringData.air_quality && (
                        <div className="mb-4">
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${getAQIColor(monitoringData.air_quality.aqi)}`}>
                              {monitoringData.air_quality.aqi}
                            </div>
                            <h4 className="font-semibold text-lg">Air Quality Index</h4>
                          </div>
                          <p className="mb-4">{monitoringData.air_quality.description}</p>
                          <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-3 rounded">
                              <p className="text-sm text-gray-500">PM2.5</p>
                              <p className="font-medium">{monitoringData.air_quality.pollutants.pm2_5} μg/m³</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                              <p className="text-sm text-gray-500">PM10</p>
                              <p className="font-medium">{monitoringData.air_quality.pollutants.pm10} μg/m³</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {monitoringData.data_type === 'water_quality' && monitoringData.water_quality && (
                        <div className="mb-4">
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${monitoringData.water_quality.overall_index <= 2 ? 'bg-green-500' : monitoringData.water_quality.overall_index <= 3 ? 'bg-yellow-500' : 'bg-red-500'}`}>
                              {monitoringData.water_quality.overall_index}
                            </div>
                            <h4 className="font-semibold text-lg">Water Quality Index</h4>
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-3 rounded">
                              <p className="text-sm text-gray-500">pH Level</p>
                              <p className="font-medium">{monitoringData.water_quality.ph_level.toFixed(1)}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                              <p className="text-sm text-gray-500">Turbidity</p>
                              <p className="font-medium">{monitoringData.water_quality.turbidity.toFixed(1)}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                              <p className="text-sm text-gray-500">Dissolved Oxygen</p>
                              <p className="font-medium">{monitoringData.water_quality.dissolved_oxygen.toFixed(1)} mg/L</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                              <p className="text-sm text-gray-500">E. Coli Presence</p>
                              <p className="font-medium">{monitoringData.water_quality.e_coli_presence}</p>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-4">{monitoringData.water_quality.note}</p>
                        </div>
                      )}
                      
                      {monitoringData.data_type === 'pollution' && monitoringData.pollution && (
                        <div className="mb-4">
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${monitoringData.pollution.overall_index <= 2 ? 'bg-green-500' : monitoringData.pollution.overall_index <= 3 ? 'bg-yellow-500' : 'bg-red-500'}`}>
                              {monitoringData.pollution.overall_index}
                            </div>
                            <h4 className="font-semibold text-lg">Pollution Index</h4>
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-3 rounded">
                              <p className="text-sm text-gray-500">Noise Pollution</p>
                              <p className="font-medium">{monitoringData.pollution.noise_pollution.toFixed(1)} dB</p>
                            </div><div className="bg-gray-50 p-3 rounded">
                              <p className="text-sm text-gray-500">Light Pollution</p>
                              <p className="font-medium">{monitoringData.pollution.light_pollution.toFixed(1)}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                              <p className="text-sm text-gray-500">Waste Management</p>
                              <p className="font-medium">{monitoringData.pollution.waste_management_index}/10</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                              <p className="text-sm text-gray-500">Soil Pollution</p>
                              <p className="font-medium">{monitoringData.pollution.soil_pollution}</p>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-4">{monitoringData.pollution.note}</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Report Data Display with Enhanced Formatting */}
                  <div className="mt-6">
                    <div className="flex items-center gap-2 mb-6">
                      <h4 className={`font-semibold text-lg ${getDataTypeColorScheme(selectedOption)}`}>Detailed Environmental Report</h4>
                      {reportLoading && (
                        <div className="w-5 h-5 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
                      )}
                    </div>
                    
                    {reportLoading ? (
                      <LoadingSpinner />
                    ) : reportData && reportData.sections ? (
                      <div className="bg-white rounded-lg">
                        {/* Report Header */}
                        <div className={`mb-4 p-4 rounded-lg bg-opacity-20 ${
                          selectedOption === 'air_quality' ? 'bg-blue-100' : 
                          selectedOption === 'water_quality' ? 'bg-teal-100' : 'bg-purple-100'
                        }`}>
                          <h3 className="font-bold text-xl text-center">
                            {selectedOption === 'air_quality' && '🌬️ '}
                            {selectedOption === 'water_quality' && '💧 '}
                            {selectedOption === 'pollution' && '🌿 '}
                            Comprehensive {options.find(o => o.id === selectedOption)?.name} Report for {reportData.location}
                          </h3>
                          <p className="text-center text-sm text-gray-600 mt-2">
                            Updated: {new Date(reportData.timestamp).toLocaleDateString()} at {new Date(reportData.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                        
                        {/* Report Sections with Enhanced Formatting */}
                        {reportData.sections.map((section, index) => (
                          <EnhancedReportSection key={index} section={section} index={index} />
                        ))}
                        
                        {/* Report Footer */}
                        <div className="mt-6 text-center text-xs text-gray-500 border-t pt-4">
                          Report generated by EcoGuard™ Environmental Monitoring System
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">
                          No report data available for this location and category.
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Alerts Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">
            {alertType === 'community' ? 'Community Alerts' : 'Health Risk Alerts'}
          </h2>
          
          {alertData && alertData.alerts && alertData.alerts.length > 0 ? (
            <div>
              {alertData.alerts.map((alert, index) => (
                <Alert 
                  key={index}
                  type={alert.type}
                  title={alert.title}
                  message={alert.message}
                />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-500">No alerts available for this location.</p>
            </div>
          )}
        </div>
      </section>

      {/* Download Center */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Data Download Center</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">
              Access comprehensive datasets to better understand environmental factors and their impacts on {environmentalData?.location.city || 'your area'}.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {options.map(option => (
                <button
                  key={option.id}
                  onClick={() => {
                    setSelectedOption(option.id);
                    downloadData();
                  }}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-3 px-4 rounded transition"
                >
                  Download {option.name} Data
                </button>
              ))}
              <button
                onClick={() => {
                  window.open(`${API_BASE_URL}/download?location=${encodeURIComponent(location)}&type=all`);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded transition"
              >
                Download All Data
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Data is provided in JSON format and includes all available environmental metrics, reports, and analyses.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
