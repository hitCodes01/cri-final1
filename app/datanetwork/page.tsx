"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Dataset, Public, Group, Share } from "@mui/icons-material";
import "../styles/datanetwork.css";

export default function ClimateDataNetworkPage() {
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
        <title>Global Climate Data Network</title>
      </Head>

      {/* Hero Section */}
      <section className="relative h-screen hero-section overflow-hidden fade-in">
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center p-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white hover-scale-up transition-transform">Global Climate Data Network</h1>
          <p className="text-lg text-gray-200 mt-4 max-w-2xl slide-in-up delay-200">
            The Global Climate Data Network connects organizations, researchers, and governments to share and access actionable climate data, helping to build resilience against climate challenges.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="intro-section fade-in py-16 bg-gray-100 text-center">
        <div className="intro-content">
          <h2 className="text-4xl font-semibold mb-8 text-gray-100">Connecting the World for Climate Action</h2>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto mb-12">
            The Global Climate Data Network facilitates collaboration and empowers communities worldwide to take meaningful action against climate change. Learn about the tools and resources available.
          </p>
        </div>
      </section>

      {/* Core Components Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Components</h2>
            <p className="text-lg text-muted-foreground">Comprehensive tools and resources for climate action</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Data Collaboration Portal */}
            <Card className="fade-in delay-200">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Share className="text-[20px] text-blue-600" />
                  <Badge variant="secondary">Featured</Badge>
                </div>
                <CardTitle className="text-xl text-blue-600">Data Collaboration Portal</CardTitle>
                <CardDescription>
                  Share and access climate data seamlessly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Real-time data sharing capabilities</li>
                  <li>• Secure data transfer protocols</li>
                  <li>• Advanced visualization tools</li>
                  <li>• Collaborative research features</li>
                </ul>
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() =>
                    openModal(
                      "Welcome to the Data Collaboration Portal. Here you can upload and share climate data in real-time!"
                    )
                  }
                >
                  Access Portal
                </Button>
              </CardContent>
            </Card>

            {/* Customizable API Access */}
            <Card className="fade-in delay-300">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Dataset className="text-[20px] text-green-600" />
                  <Badge variant="secondary">Developer Tools</Badge>
                </div>
                <CardTitle className="text-xl text-green-600">Customizable API Access</CardTitle>
                <CardDescription>
                  Integrate climate data into your systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• RESTful API endpoints</li>
                  <li>• Real-time data streaming</li>
                  <li>• Custom data queries</li>
                  <li>• Comprehensive documentation</li>
                </ul>
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() =>
                    openModal(
                      "Explore our API Documentation. Integrate real-time climate data into your applications."
                    )
                  }
                >
                  View API Docs
                </Button>
              </CardContent>
            </Card>

            {/* Global Climate Resilience Forum */}
            <Card className="fade-in delay-400">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Group className="text-[20px] text-purple-600" />
                  <Badge variant="secondary">Community</Badge>
                </div>
                <CardTitle className="text-xl text-purple-600">Global Climate Resilience Forum</CardTitle>
                <CardDescription>
                  Connect with climate action leaders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Discussion boards</li>
                  <li>• Expert insights</li>
                  <li>• Project collaboration</li>
                  <li>• Resource sharing</li>
                </ul>
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() =>
                    openModal(
                      "Join the Global Climate Resilience Forum. Engage with experts and collaborate on projects."
                    )
                  }
                >
                  Join Forum
                </Button>
              </CardContent>
            </Card>

            {/* Global Resilience Initiatives */}
            <Card className="fade-in delay-500">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Public className="text-[20px] text-orange-600" />
                  <Badge variant="secondary">Directory</Badge>
                </div>
                <CardTitle className="text-xl text-orange-600">Global Resilience Initiatives</CardTitle>
                <CardDescription>
                  Discover active climate projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Project database</li>
                  <li>• Impact metrics</li>
                  <li>• Collaboration opportunities</li>
                  <li>• Success stories</li>
                </ul>
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() =>
                    openModal(
                      "Browse the Global Resilience Initiatives. Discover impactful projects worldwide."
                    )
                  }
                >
                  Browse Projects
                </Button>
              </CardContent>
            </Card>
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
