"use client"

import { useState, useEffect } from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import dynamic from 'next/dynamic';
import "../styles/climasynapse.css";
import { MapType, ScenarioType, WeatherData } from "./types";

const DynamicClimateMap = dynamic(() => import('./ClimateMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full flex items-center justify-center bg-gray-100 rounded-lg">
      <p className="text-gray-600">Loading Map...</p>
    </div>
  )
});

const DynamicForecastDashboard = dynamic(() => import('./ForecastDashboard'), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full flex items-center justify-center bg-gray-100 rounded-lg">
      <p className="text-gray-600">Loading Dashboard...</p>
    </div>
  )
});

export default function ClimateForecastingPage() {
  const [selectedMapLayer, setSelectedMapLayer] = useState<MapType>("temperature");
  const [forecastScenario, setForecastScenario] = useState<ScenarioType>("short");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [mounted, setMounted] = useState(false);

  const mapLayers = [
    { id: "temperature" as MapType, name: "Temperature" },
    { id: "precipitation" as MapType, name: "Precipitation" },
    { id: "extreme-weather" as MapType, name: "Extreme Weather" },
  ];

  const forecastScenarios = [
    { id: "short" as ScenarioType, name: "Short-Term Forecast" },
    { id: "medium" as ScenarioType, name: "Medium-Term Forecast" },
    { id: "long" as ScenarioType, name: "Long-Term Forecast" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchWeatherData = async () => {
    // Don't fetch if location is empty
    if (!location) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://clima-synapse-ib3l.vercel.app/api/forecast/${selectedMapLayer}?city=${encodeURIComponent(location)}&term=${forecastScenario}`
      );

      if (!response.ok) throw new Error('Failed to fetch data');

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };


  const handleMapLayerChange = (layerId: MapType) => {
    setSelectedMapLayer(layerId);
    if (location) {
      fetchWeatherData();
    }
  };

  
  const handleForecastScenarioChange = (scenarioId: ScenarioType) => {
    setForecastScenario(scenarioId);
    if (location) {
      fetchWeatherData();
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (locationInput.trim()) {
      setLocation(locationInput.trim());
    }
  };

 
  useEffect(() => {
    if (mounted && location) {
      fetchWeatherData();
    }
  }, [location, selectedMapLayer, forecastScenario, mounted]);

  // Parse and format markdown-like content into structured JSX
  const parseMarkdownContent = (content: string) => {
    if (!content) return null;

   
    const cleanedContent = content.replace(/###\s*$/, '');
    
    if (cleanedContent.includes('### ')) {
     
      const sections = cleanedContent.split(/###\s+/).filter(section => section.trim());
      
      return (
        <div className="space-y-6">
          {sections.map((section, index) => {
        
            const titleMatch = section.match(/^(.*?)(?:[\n\r]|-)/);
            const title = titleMatch ? titleMatch[1].trim() : '';
            
          
            const contentWithoutTitle = section.replace(title, '').trim();
            
           
            let bulletPoints = [];
            if (contentWithoutTitle.includes('- ')) {
              bulletPoints = contentWithoutTitle
                .split(/\n\s*-\s+/)
                .map(point => point.trim())
                .filter(point => point);
            } else {
              bulletPoints = contentWithoutTitle
                .split(/\n\n+/)
                .map(para => para.trim())
                .filter(para => para);
            }
            
            // Alternate background colors for sections
            const bgColors = ["bg-green-50", "bg-blue-50", "bg-amber-50", "bg-purple-50"];
            const borderColors = ["border-green-200", "border-blue-200", "border-amber-200", "border-purple-200"];
            const textColors = ["text-green-800", "text-blue-800", "text-amber-800", "text-purple-800"];
            
            return (
              <div key={index} className={`${bgColors[index % bgColors.length]} p-4 rounded-lg shadow-sm border ${borderColors[index % borderColors.length]} transition-all duration-300 hover:shadow-md`}>
                <h3 className={`font-bold text-xl ${textColors[index % textColors.length]} mb-3 flex items-center`}>
                  <span className="inline-block w-3 h-3 rounded-full bg-current mr-2"></span>
                  {title.replace(/\*\*/g, '')}
                </h3>
                <ul className="space-y-3 pl-5">
                  {bulletPoints.map((point, pointIndex) => (
                    <li key={pointIndex} className="text-gray-800 relative flex">
                      <span className={`absolute left-0 -ml-5 mt-1.5 w-2.5 h-2.5 rounded-full ${textColors[index % textColors.length].replace('text-', 'bg-')}`}></span>
                      <span 
                        className="flex-1"
                        dangerouslySetInnerHTML={{
                          __html: point
                            .replace(/\*\*(.*?)\*\*/g, `<strong class="${textColors[index % textColors.length]}">$1</strong>`)
                            .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      );
    }
    else if (cleanedContent.includes('#### ')) {
    
      const sections = cleanedContent.split(/####\s+/).filter(section => section.trim());
      
      return (
        <div className="space-y-6">
          {sections.map((section, index) => {
           
            const titleMatch = section.match(/^(.*?)(?:[\n\r]|-)/);
            const title = titleMatch ? titleMatch[1].trim() : '';
            
            const contentWithoutTitle = section.replace(title, '').trim();
          
            const bulletPoints = contentWithoutTitle
              .split(/\n\s*-\s+/)
              .map(point => point.trim())
              .filter(point => point);
            
            // Alternate background colors for sections
            const bgColors = ["bg-green-50", "bg-blue-50", "bg-amber-50", "bg-purple-50"];
            const borderColors = ["border-green-200", "border-blue-200", "border-amber-200", "border-purple-200"];
            const textColors = ["text-green-800", "text-blue-800", "text-amber-800", "text-purple-800"];
            
            return (
              <div key={index} className={`${bgColors[index % bgColors.length]} p-4 rounded-lg shadow-sm border ${borderColors[index % borderColors.length]} transition-all duration-300 hover:shadow-md`}>
                <h4 className={`font-bold text-lg ${textColors[index % textColors.length]} mb-3 flex items-center`}>
                  <span className="inline-block w-3 h-3 rounded-full bg-current mr-2"></span>
                  {title.replace(/\*\*/g, '')}
                </h4>
                <ul className="space-y-3 pl-5">
                  {bulletPoints.map((point, pointIndex) => (
                    <li key={pointIndex} className="text-gray-800 relative flex">
                      <span className={`absolute left-0 -ml-5 mt-1.5 w-2.5 h-2.5 rounded-full ${textColors[index % textColors.length].replace('text-', 'bg-')}`}></span>
                      <span 
                        className="flex-1"
                        dangerouslySetInnerHTML={{
                          __html: point
                            .replace(/\*\*(.*?)\*\*/g, `<strong class="${textColors[index % textColors.length]}">$1</strong>`)
                            .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      );
    }
    
    
    return formatParagraphText(cleanedContent);
  };

  // Format text that doesn't have structured markdown but has paragraphs
  const formatParagraphText = (text: string) => {
    if (!text) return null;
    
   
    const paragraphs = text.split(/\n\n+/);
    
    
    const bgColors = ["bg-green-50", "bg-blue-50", "bg-amber-50"];
    const borderColors = ["border-green-200", "border-blue-200", "border-amber-200"];
    const textColors = ["text-green-800", "text-blue-800", "text-amber-800"];
    
    return (
      <div className="space-y-4">
        {paragraphs.map((paragraph, idx) => {
          
          const isNumberedItem = /^\d+\.\s/.test(paragraph);
          
        
          const formattedText = paragraph
            .replace(/\*\*(.*?)\*\*/g, `<strong class="${textColors[idx % textColors.length]}">$1</strong>`)
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
          
          
          if (isNumberedItem) {
            return (
              <div 
                key={idx} 
                className={`ml-5 mb-4 p-3 rounded-lg ${bgColors[idx % bgColors.length]} border ${borderColors[idx % borderColors.length]}`}
              >
                <p dangerouslySetInnerHTML={{ __html: formattedText }} />
              </div>
            );
          }
          
          return (
            <div 
              key={idx} 
              className={`p-4 rounded-lg ${bgColors[idx % bgColors.length]} border ${borderColors[idx % borderColors.length]} transition-all duration-300 hover:shadow-md`}
            >
              <p 
                className="text-gray-800" 
                dangerouslySetInnerHTML={{ __html: formattedText }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Head>
        <title>ClimaSynapse™</title>
      </Head>

      {/* Hero Section */}
      <section className="relative h-screen hero-section bg-gradient-to-b from-green-900 to-teal-600 text-white flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Climate Data & Forecasting</h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Harness the power of AI with ClimaSynapse™ for real-time climate insights and actionable data.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Interactive Climate Forecast Map</h2>

          <div className="mb-8">
            <form onSubmit={handleSubmit}>
              <div className="flex max-w-md mx-auto">
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit(e);
                    }
                  }}
                  placeholder="Enter location and press Enter"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Search
                </button>
              </div>
              {location && (
                <p className="text-center mt-2 text-sm text-green-600">
                  Currently showing data for: <strong>{location}</strong>
                </p>
              )}
            </form>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-1/3">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Map Layers</h3>
                  <div className="space-y-3">
                    {mapLayers.map((layer) => (
                      <button
                        key={layer.id}
                        onClick={() => handleMapLayerChange(layer.id)}
                        className={`w-full p-4 rounded-lg transition-all duration-200 ${
                          selectedMapLayer === layer.id
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-green-100"
                        }`}
                      >
                        {layer.name}
                      </button>
                    ))}
                  </div>

                  <h3 className="text-xl font-semibold mt-8 mb-6">Forecast Scenarios</h3>
                  <div className="space-y-3">
                    {forecastScenarios.map((scenario) => (
                      <button
                        key={scenario.id}
                        onClick={() => handleForecastScenarioChange(scenario.id)}
                        className={`w-full p-4 rounded-lg transition-all duration-200 ${
                          forecastScenario === scenario.id
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-blue-100"
                        }`}
                      >
                        {scenario.name}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <div className="w-full lg:w-2/3">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-6 text-green-600 capitalize">
                    {selectedMapLayer} - {forecastScenario} Term Forecast
                  </h3>

                  {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
                      {error}
                    </div>
                  )}

                  {!location ? (
                    <div className="h-[500px] flex items-center justify-center bg-gray-50 rounded-lg">
                      <div className="text-center p-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-gray-600 text-lg mb-2">Enter a location to view forecast data</p>
                        <p className="text-gray-500">Type a city or region name and press Enter</p>
                      </div>
                    </div>
                  ) : loading ? (
                    <div className="h-[500px] flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
                    </div>
                  ) : weatherData ? (
                    <>
                      <DynamicClimateMap
                        data={weatherData}
                        mapType={selectedMapLayer}
                      />
                      <div className="mt-8">
                        <DynamicForecastDashboard
                          data={weatherData}
                          scenario={forecastScenario}
                          mapType={selectedMapLayer}
                        />
                      </div>
                    </>
                  ) : null}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-0 h-2 bg-green-200 opacity-50"></span>
              <span className="relative">Risk Assessment Dashboard</span>
            </span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="overflow-hidden border-t-4 border-t-red-500 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="bg-gradient-to-r from-red-50 to-amber-50 p-4 border-b border-red-100">
                <h3 className="text-xl font-semibold text-red-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Projected Climate Risks
                </h3>
              </div>
              <CardContent className="p-6">
                {!location ? (
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-600">Enter a location to view climate risk data</p>
                  </div>
                ) : loading ? (
                  <div className="h-64 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500" />
                  </div>
                ) : weatherData?.projected_climate_risks ? (
                  <div className="text-gray-800">
                    {parseMarkdownContent(weatherData.projected_climate_risks)}
                  </div>
                ) : weatherData?.alerts && weatherData.alerts.length > 0 ? (
                  <div className="space-y-4">
                    {weatherData.alerts.map((alert, index) => (
                      <div key={index} className="p-4 bg-red-50 rounded-lg border border-red-200 shadow-sm">
                        <h4 className="font-semibold text-red-700 flex items-center">
                          <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                          {alert.event}
                        </h4>
                        <p className="mt-2 text-gray-700 pl-4">{alert.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-600">No climate risk data available for this location</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-t-4 border-t-blue-500 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-4 border-b border-blue-100">
                <h3 className="text-xl font-semibold text-blue-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Regional Impact Analysis
                </h3>
              </div>
              <CardContent className="p-6">
                {!location ? (
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-600">Enter a location to view regional impact data</p>
                  </div>
                ) : loading ? (
                  <div className="h-64 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
                  </div>
                ) : weatherData?.regional_impact_analysis ? (
                  <div className="text-gray-800">
                    {parseMarkdownContent(weatherData.regional_impact_analysis)}
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-600">No regional impact data available for this location</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Data Download Center</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">
              Access real-time datasets and generate custom reports using our data query tool.
            </p>
            <Button 
              variant="default" 
              className="mt-4 w-full"
              disabled={!weatherData}
              onClick={() => {
                if (weatherData) {
                  const jsonString = JSON.stringify(weatherData, null, 2);
                  const blob = new Blob([jsonString], { type: 'application/json' });
                  const href = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = href;
                  link.download = `climate-data-${location}-${selectedMapLayer}-${forecastScenario}.json`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }
              }}
            >
              {!location ? "Enter a location to download data" : "Download Datasets"}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}