/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import "../styles/ecoguard.css";

interface AlertProps {
  type: 'success' | 'error' | 'info';
  message: string;
}

function Alert({ type, message }: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

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
  };

  const currentStyle = alertStyles[type] || alertStyles.info;

  return (
    <div
      className={`flex items-center gap-4 p-4 mb-4 rounded-lg border ${currentStyle.bg} ${currentStyle.border}`}
    >
      <span className={`text-2xl ${currentStyle.text}`}>{currentStyle.icon}</span>
      <div className="flex-grow">
        <p className={`font-bold ${currentStyle.text}`}>{type.toUpperCase()}</p>
        <p className={`text-sm ${currentStyle.text}`}>{message}</p>
      </div>
      <button
        className={`text-gray-400 hover:text-gray-600`}
        onClick={() => setIsVisible(false)}
      >
        ✖
      </button>
    </div>
  );
}

export default function EnvironmentalPage() {
  const [selectedOption, setSelectedOption] = useState("air_quality");
  const [alertType, setAlertType] = useState("community");

  const options = [
    { id: "air_quality", name: "Air Quality" },
    { id: "water_quality", name: "Water Quality" },
    { id: "pollution", name: "Pollution" },
  ];

  const alerts = [
    { id: "community", name: "Community Alerts" },
    { id: "health_risk", name: "Health Risk Alerts" },
  ];

  return (
    <div className="text-gray-900 font-sans">
      <Head>
        <title>Environmental Monitoring & Health</title>
      </Head>

      {/* Hero Section */}
      <section className="relative h-screen hero-section bg-gradient-to-b from-blue-800 to-teal-500 text-white flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Environmental Monitoring</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Discover real-time environmental insights and safeguard your community with EcoGuard™.
          </p>
        </div>
      </section>

      {/* Interactive Monitoring Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Real-Time Environmental Map</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Monitoring Options</h3>
              <ul className="space-y-4">
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
            </aside>

            <div className="w-full md:w-2/3 bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">{selectedOption} - {alertType}</h3>
              <p className="text-gray-700">
                Displaying alerts and data for {selectedOption} under {alertType}.
              </p>
              <div className="mt-6 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Visualization will be displayed here.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Important Alerts</h2>
          <Alert type="success" message="Data successfully updated for air quality!" />
          <Alert type="error" message="Failed to retrieve water quality data." />
          <Alert type="info" message="New health risk alerts have been issued for your area." />
        </div>
      </section>

      

      {/* Community Health Dashboard */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Community Health Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Health Impact Heat Map</h3>
              <p className="text-gray-700 mb-4">
                Analyze regions with significant health impacts due to environmental factors.
              </p>
              <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Heat maps will be displayed here.</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Regional Reports</h3>
              <p className="text-gray-700 mb-4">
                Access community-specific environmental health reports.
              </p>
              <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Reports will be displayed here.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Center */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Data Download Center</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">
              Access comprehensive datasets to better understand environmental factors and their impacts.
            </p>
            <Button variant="default" className="mt-4 w-full">
              Download Data
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
