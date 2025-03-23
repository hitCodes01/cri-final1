"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import "../styles/modelshowcase.css";

export default function AIModelShowcasePage() {
  const [selectedTab, setSelectedTab] = useState<string | null>("ClimaSynapse");
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const topButton = document.querySelector(".scroll-to-top");
    if (topButton) {
      topButton.addEventListener("click", handleScrollToTop);
    }
    return () => {
      if (topButton) topButton.removeEventListener("click", handleScrollToTop);
    };
  }, []);

  const tabs = [
    {
      id: "ClimaSynapse",
      title: "ClimaSynapse™",
      description: "Real-time climate change prediction using geospatial and atmospheric data.",
      features: [
        "Advanced atmospheric modeling",
        "Multi-layer geospatial analysis",
        "Impact predictions across regions",
      ],
      impact: 85,
    },
    {
      id: "EcoGuard",
      title: "EcoGuard™",
      description: "AI-driven monitoring for ecosystems and biodiversity protection.",
      features: [
        "Wildlife tracking and preservation",
        "Deforestation monitoring",
        "Marine ecosystem insights",
      ],
      impact: 78,
    },
    {
      id: "AdaptNet",
      title: "AdaptNet™",
      description: "Infrastructure adaptation modeling for climate resilience.",
      features: [
        "Critical infrastructure assessments",
        "Resilience improvement plans",
        "Urban adaptation strategies",
      ],
      impact: 92,
    },
    {
      id: "InfraPredict",
      title: "InfraPredict™",
      description: "Predictive analytics for disaster preparedness and infrastructure risks.",
      features: [
        "Flood and earthquake risk analysis",
        "Energy grid vulnerability assessment",
        "Transport system impact forecasting",
      ],
      impact: 88,
    },
    {
      id: "SocioMap",
      title: "SocioMap®",
      description: "Mapping social vulnerability to enhance equitable resilience efforts.",
      features: [
        "Community risk profiling",
        "Social equity metrics",
        "Localized resource allocation",
      ],
      impact: 81,
    },
  ];

  const openModal = (content: string) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setModalVisible(false);
  };

  return (
    <div className="text-gray-900 font-sans">
      <Head>
        <title>Interactive AI Model Showcase</title>
      </Head>

      {/* Hero Section */}
      <section className="relative h-screen hero-section bg-gradient-to-b from-blue-900 to-indigo-600 text-white flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Interactive AI Model Showcase</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Experience and interact with AI models designed to address global climate challenges. Discover, learn, and apply AI tools in your field.
          </p>
        </div>
      </section>

      {/* Tab Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:gap-12">
            {/* Sidebar */}
            <aside className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6">Explore AI Models</h2>
              <ul className="space-y-4">
                {tabs.map((tab) => (
                  <li
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`p-4 cursor-pointer rounded-lg transition ${
                      selectedTab === tab.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-blue-100"
                    }`}
                  >
                    {tab.title}
                  </li>
                ))}
              </ul>
            </aside>

            {/* Tab Content */}
            <div className="w-full md:w-2/3 bg-white p-8 rounded-lg shadow-md">
              {tabs.map(
                (tab) =>
                  selectedTab === tab.id && (
                    <div key={tab.id}>
                      <h3 className="text-3xl font-bold mb-4 text-blue-600">{tab.title}</h3>
                      <p className="text-gray-700 mb-6">{tab.description}</p>
                      <ul className="space-y-2 text-gray-600">
                        {tab.features.map((feature, idx) => (
                          <li key={idx}>• {feature}</li>
                        ))}
                      </ul>
                      <div className="mt-8">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Impact Score:</h4>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div
                            className="bg-blue-500 h-4 rounded-full transition-all"
                            style={{ width: `${tab.impact}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{tab.impact}% Impact Rating</p>
                      </div>
                      <Button
                        variant="outline"
                        className="mt-6 w-full"
                        onClick={() =>
                          openModal(
                            `${tab.title} provides cutting-edge AI tools to address specific climate challenges. Engage with its features today!`
                          )
                        }
                      >
                        Learn More
                      </Button>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
            <h3 className="text-lg font-bold mb-4">Feature Details</h3>
            <p className="text-sm text-gray-700">{modalContent}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      <button className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 pt-2 rounded-full shadow-lg hover:bg-blue-600 scroll-to-top">↑</button>
    </div>
  );
}
