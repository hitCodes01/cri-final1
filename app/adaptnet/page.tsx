"use client";
import { useState } from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { useAdaptnet } from "../../hooks/useAdaptnet";
import "../styles/adaptnet.css";

// export issue resolved..
const useResourceSection = () => {
  const [selectedResourceSection, setSelectedResourceSection] = useState("adaptationPlan");
  const [selectedEmergencyPlan, setSelectedEmergencyPlan] = useState<string | null>(null);

  const resourceSections = [
    { id: "adaptationPlan", name: "Adaptation Plan Generator" },
    { id: "resourceAllocation", name: "Resource Allocation Dashboard" },
    { id: "emergencyResponse", name: "Emergency Response Toolkit" },
  ];

  return {
    selectedResourceSection,
    selectedEmergencyPlan,
    resourceSections,
    setSelectedResourceSection,
    setSelectedEmergencyPlan
  };
};

export default function CommunityAdaptationPage() {
  const {
    formData,
    loading,
    error,
    adaptationResult,
    handleInputChange,
    generatePlan,
  } = useAdaptnet();

  const {
    selectedResourceSection,
    selectedEmergencyPlan,
    resourceSections,
    setSelectedResourceSection,
    setSelectedEmergencyPlan
  } = useResourceSection();

  const handleSectionChange = (section: string) => {
    setSelectedResourceSection(section);
  };

  const handleEmergencyPlanClick = (plan: string) => {
    setSelectedEmergencyPlan(plan);
  };

  return (
    <div className="text-gray-900 font-sans">
      <Head>
        <title>Community Adaptation & Resources</title>
      </Head>

      {/* Hero Section */}
      <section className="relative h-screen hero-section bg-gradient-to-b from-blue-900 to-green-600 text-white flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Community Adaptation & Resources</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Leverage AdaptNet™ to create personalized resilience plans and optimize resource allocation for your community.
          </p>
        </div>
      </section>

      {/* Interactive Community Resource Sections */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Community Adaptation Tools</h2>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Resource Sections</h3>
              <ul className="space-y-4">
                {resourceSections.map((section) => (
                  <li
                    key={section.id}
                    onClick={() => handleSectionChange(section.id)}
                    className={`p-4 cursor-pointer rounded-lg transition ${
                      selectedResourceSection === section.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-blue-200"
                    }`}
                  >
                    {section.name}
                  </li>
                ))}
              </ul>
            </aside>

            {/* Main Content */}
            <div className="w-full md:w-2/3 bg-white p-8 rounded-lg shadow-md">
              {selectedResourceSection === "adaptationPlan" && (
                <>
                  <h3 className="text-2xl font-bold mb-4 text-green-600">Adaptation Plan Generator</h3>
                  <p className="text-gray-700 mb-4">
                    Generate personalized climate adaptation plans for your community by inputting local data.
                  </p>
                  <div className="mt-6">
                    <div className="bg-gray-200 p-6 rounded-lg mb-6">
                      <h4 className="text-lg font-semibold mb-2">Community Information</h4>
                      <form onSubmit={generatePlan}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-gray-700">Community Name</label>
                            <input
                              type="text"
                              name="community_name"
                              value={formData.community_name}
                              onChange={handleInputChange}
                              className="w-full p-2 border rounded"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-gray-700">Population</label>
                            <input
                              type="number"
                              name="population"
                              value={formData.population}
                              onChange={handleInputChange}
                              className="w-full p-2 border rounded"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-gray-700">Average Temperature (°C)</label>
                            <input
                              type="number"
                              name="feature_1"
                              value={formData.feature_1}
                              onChange={handleInputChange}
                              className="w-full p-2 border rounded"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-gray-700">Annual Rainfall (mm)</label>
                            <input
                              type="number"
                              name="feature_2"
                              value={formData.feature_2}
                              onChange={handleInputChange}
                              className="w-full p-2 border rounded"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-gray-700">Elevation (m)</label>
                            <input
                              type="number"
                              name="feature_3"
                              value={formData.feature_3}
                              onChange={handleInputChange}
                              className="w-full p-2 border rounded"
                              required
                            />
                          </div>
                        </div>
                        <Button
                          type="submit"
                          variant="default"
                          className="mt-4 w-full bg-green-600 hover:bg-green-700"
                          disabled={loading}
                        >
                          {loading ? "Generating Plan..." : "Generate Plan"}
                        </Button>
                      </form>
                    </div>
                  </div>

                  {error && (
                     <div className="mt-4 p-4 text-sm border rounded-lg bg-red-50 border-red-500 text-red-700">
                       {error}
                     </div>
                    )}
                  {adaptationResult && (
                    <div className="bg-gray-200 p-6 rounded-lg mt-6">
                      <h4 className="text-lg font-semibold mb-4">Adaptation Recommendations</h4>
                      <div className="bg-white p-4 rounded-lg shadow-md">
                        <p className="text-gray-700 mb-2">
                          <strong>Community:</strong> {adaptationResult.community_name}
                        </p>
                        <p className="text-gray-700 mb-2">
                          <strong>Population:</strong> {adaptationResult.population.toLocaleString()}
                        </p>
                        <p className="text-gray-700">
                          <strong>Recommended Adaptation Measure:</strong>{" "}
                          {adaptationResult.recommendation}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}

              {selectedResourceSection === "resourceAllocation" && (
                <>
                  <h3 className="text-2xl font-bold mb-4 text-blue-600">Resource Allocation Dashboard</h3>
                  <p className="text-gray-700 mb-4">
                    Visualize real-time resource needs and forecast materials and infrastructure requirements for resilience.
                  </p>
                  <div className="mt-6 bg-gray-200 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4">Material & Resource Forecasts</h4>
                    <div className="h-64 bg-gray-300 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Interactive graphs and forecasts will be displayed here.</p>
                    </div>
                  </div>
                </>
              )}

              {selectedResourceSection === "emergencyResponse" && (
                <>
                  <h3 className="text-2xl font-bold mb-4 text-red-600">Emergency Response Toolkit</h3>
                  <p className="text-gray-700 mb-4">
                    Access step-by-step response plans for emergencies such as floods, droughts, fires, and more.
                  </p>
                  <div className="mt-6 bg-gray-200 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4">Step-by-Step Guides</h4>
                    <ul className="space-y-2">
                      {["Flood", "Drought", "Fire"].map((plan) => (
                        <li
                          key={plan}
                          className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleEmergencyPlanClick(plan)}
                        >
                          {plan} Response Plan
                        </li>
                      ))}
                    </ul>
                    {selectedEmergencyPlan && (
                      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
                        <h4 className="text-lg font-semibold mb-2">{selectedEmergencyPlan} Response Plan</h4>
                        <p className="text-gray-700">
                          Detailed steps and resources for responding to {selectedEmergencyPlan.toLowerCase()} emergencies.
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

      {/* Download Community Resources */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Download Community Resources</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">
              Access community-specific data, reports, and resilience tools that will help enhance preparedness and adaptation.
            </p>
            <Button variant="default" className="mt-4 w-full">
              Download Resources
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}