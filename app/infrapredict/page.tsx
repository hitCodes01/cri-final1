"use client";
import { useState } from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import "../styles/infrapredict.css";

export default function InfrastructureResiliencePage() {
  const [selectedMapLayer, setSelectedMapLayer] = useState("vulnerability");
  const [maintenanceScenario, setMaintenanceScenario] = useState("predictive");

  const mapLayers = [
    { id: "vulnerability", name: "Infrastructure Vulnerability" },
    { id: "durability", name: "Durability Scores" },
    { id: "risk", name: "Risk Assessment" },
  ];

  const maintenanceScenarios = [
    { id: "predictive", name: "Predictive Maintenance" },
    { id: "scheduled", name: "Scheduled Maintenance" },
  ];

  const handleLayerChange = (layer: string) => {
    setSelectedMapLayer(layer);
  };

  const handleMaintenanceScenarioChange = (scenario: string) => {
    setMaintenanceScenario(scenario);
  };

  return (
    <div className="text-gray-900 font-sans">
      <Head>
        <title>Infrastructure Resilience</title>
      </Head>

      {/* Hero Section */}
      <section className="relative h-screen hero-section bg-gradient-to-b from-blue-900 to-green-600 text-white flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Infrastructure Resilience</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Strengthen critical infrastructure and plan for climate resilience with our predictive tools.
          </p>
        </div>
      </section>

      {/* Interactive Infrastructure Vulnerability Map */}
      <section className="py-16 bg-gray-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Infrastructure Vulnerability Map</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Map Layers</h3>
              <ul className="space-y-4">
                {mapLayers.map((layer) => (
                  <li
                    key={layer.id}
                    onClick={() => handleLayerChange(layer.id)}
                    className={`p-4 cursor-pointer rounded-lg transition transform hover:scale-105 ${
                      selectedMapLayer === layer.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-blue-100"
                    }`}
                  >
                    {layer.name}
                  </li>
                ))}
              </ul>
            </aside>

            <div className="w-full md:w-2/3 bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">{selectedMapLayer} View</h3>
              <p className="text-gray-700">
                Displaying vulnerability map for {selectedMapLayer}.
              </p>
              <div className="mt-6 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Interactive map visualization will be displayed here.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk-Based Maintenance Planner */}
      <section className="py-16 bg-gray-100 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Risk-Based Maintenance Planner</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Maintenance Scenarios</h3>
              <ul className="space-y-4">
                {maintenanceScenarios.map((scenario) => (
                  <li
                    key={scenario.id}
                    onClick={() => handleMaintenanceScenarioChange(scenario.id)}
                    className={`p-4 cursor-pointer rounded-lg transition transform hover:scale-105 ${
                      maintenanceScenario === scenario.id
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-green-100"
                    }`}
                  >
                    {scenario.name}
                  </li>
                ))}
              </ul>
            </aside>

            <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-green-600">Selected Scenario</h3>
              <p className="text-gray-700">
                Currently selected maintenance scenario: {maintenanceScenario}.
              </p>
              <div className="mt-6 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Visualization for {maintenanceScenario} will appear here.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resilience Strengthening Resources */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">Resilience Strengthening Resources</h2>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <p className="text-gray-700 mb-4">
              Explore tutorials and guidelines on strengthening key infrastructure against climate events.
            </p>
            <div className="space-y-4">
              <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                Explore Infrastructure Resources
              </Button>
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 text-green-600 border-green-600 hover:bg-green-100">
                  Flood Resilience Guide
                </Button>
                <Button variant="outline" className="flex-1 text-green-600 border-green-600 hover:bg-green-100">
                  Storm Resistance Guide
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Planning Tool */}
      <section className="py-16 bg-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">Project Planning Tool</h2>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <p className="text-gray-700 mb-4">
              Plan, budget, and track progress on infrastructure reinforcement projects with ease.
            </p>
            <div className="space-y-4">
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                Start New Project
              </Button>
              <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center transition-transform">
                <p className="text-gray-500">Project timeline and budget tool will be here.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Funding Opportunities Directory */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-black">Funding Opportunities Directory</h2>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <p className="text-gray-700 mb-4">
              Find grants and funding sources available for climate resilience projects.
            </p>
            <div className="space-y-4">
              <Button className="w-full bg-yellow-600 text-white hover:bg-yellow-700">
                Search Funding Sources
              </Button>
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 text-yellow-600 border-yellow-600 hover:bg-yellow-100">
                  Government Grants
                </Button>
                <Button variant="outline" className="flex-1 text-yellow-600 border-yellow-600 hover:bg-yellow-100">
                  Private Funding
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
