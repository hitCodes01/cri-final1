"use client";
import { useEffect } from 'react';
import "./styles/indexStyles.css";
import "./globals.css";
import Head from 'next/head';
import Footer from './components/Footer';
import CloudIcon from '@mui/icons-material/Cloud';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import PeopleIcon from '@mui/icons-material/People';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import PolicyIcon from '@mui/icons-material/Policy';

export default function Home() {
  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.querySelectorAll('.fade-in').forEach(element => {
        element.classList.remove('fade-in');
        void (element as HTMLElement).offsetWidth;
        element.classList.add('fade-in');
      });
    };

    const topButton = document.querySelector('.scroll-to-top');
    if (topButton) {
      topButton.addEventListener('click', handleScrollToTop);
    }
    return () => {
      if (topButton) topButton.removeEventListener('click', handleScrollToTop);
    };
  }, []);

  return (
    <div className="text-gray-900 font-sans">
      <Head>
        <title>Climate Resilience Initiative</title>
      </Head>

      {/* Hero Section */}
      <section className="relative h-screen hero-section overflow-hidden fade-in">
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center p-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white hover-scale-up transition-transform">Welcome to the Climate Resilience Initiative</h1>
          <p className="text-lg text-gray-200 mt-4 max-w-2xl slide-in-up delay-200">
            Phoenix Labs&apos; Climate Resilience Initiative (CRI) leverages advanced AI to confront climate challenges facing underserved and minority communities worldwide. Discover tools, resources, and actionable data to build resilience.
          </p>
            <a href="/modelshowcase" className="mt-6 px-8 py-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-transform hover-scale-up delay-300">
            Join Us in Building a Resilient Future
            </a>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="intro-section fade-in">
        <div className="intro-content text-center">
          <h2 className="intro-heading text-4xl font-semibold mb-8">Our Mission and AI-Powered Technologies</h2>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto mb-12">
            At CRI, we harness cutting-edge AI solutions to provide real-time data, forecasts, and planning resources that enable communities to build resilience against climate impacts. Explore our core technologies and discover the tools and resources available to empower proactive climate action.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="tech-card">
              <h3 className="card-title-blue">ClimaSynapse™</h3>
              <p>ClimaSynapse™ provides interactive climate forecast maps with real-time overlays on temperature, precipitation, and extreme weather predictions. Users can view forecasts and download custom data reports tailored to regional needs.</p>
            </div>
            <div className="tech-card">
              <h3 className="card-title-green">EcoGuard™</h3>
              <p>EcoGuard™ offers real-time environmental quality maps for air and water quality, with location-specific alerts on environmental hazards, health impact analysis tools, and community health reports.</p>
            </div>
            <div className="tech-card">
              <h3 className="card-title-purple">AdaptNet™</h3>
              <p>AdaptNet™ powers personalized adaptation plans with resource allocation dashboards, an adaptation strategy library, and an emergency toolkit to enhance community readiness for climate risks.</p>
            </div>
            <div className="tech-card">
              <h3 className="card-title-orange">InfraPredict™</h3>
              <p>InfraPredict™ provides a comprehensive infrastructure vulnerability map, a risk-based maintenance planner, and project planning tools to support resilient infrastructure development.</p>
            </div>
            <div className="tech-card">
              <h3 className="card-title-red">SocioMap®</h3>
              <p>SocioMap® identifies socially vulnerable regions, provides policy recommendations for climate equity, and includes a community feedback hub to incorporate local voices in resilience planning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Navigation Buttons */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-semibold mb-8 fade-in">Key Navigation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto slide-in-up delay-200">
          {[
        { icon: <CloudIcon />, text: "Climate Data & Forecasting", link: "/climasynapse" },
        { icon: <HealthAndSafetyIcon />, text: "Environmental Monitoring & Health", link: "/ecoguard" },
        { icon: <PeopleIcon />, text: "Community Adaptation & Resources", link: "/adaptnet" },
        { icon: <ArchitectureIcon />, text: "Infrastructure Resilience", link: "/infrapredict" },
        { icon: <PolicyIcon />, text: "Social Equity & Policy Advocacy", link: "/sociomap" }
          ].map((item, idx) => (
        <a key={idx} href={item.link} className="flex items-center justify-center bg-blue-500 text-white font-semibold py-4 rounded-md hover:bg-blue-600 transition-transform transform-gpu hover-scale-up delay-300">
          {item.icon} <span className="ml-2">{item.text}</span>
        </a>
          ))}
        </div>
      </section>

      {/* Live Data Visualizations Section */}
      <section className="py-20 data-visualization-section bg-cover bg-center text-center text-white fade-in delay-200">
        <div className="bg-black bg-opacity-60 p-8 rounded-lg max-w-3xl mx-auto">
          <h2 className="text-4xl font-semibold mb-4 slide-in-left">Climate Data Visualizations</h2>
          <p className="text-lg mb-8 slide-in-left delay-200">
            Powered by ClimaSynapse™, explore climate forecast maps, environmental monitoring data, and more.
          </p>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 quick-links-section bg-cover bg-center text-center fade-in delay-200">
        <h2 className="text-4xl font-semibold mb-8">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-xl mx-auto slide-in-up delay-300">
          {[
        { text: "Model Showcase", link: "/modelshowcase" },
        { text: "Community Education & Resources", link: "/resources" },
        { text: "Global Climate Data Network", link: "/datanetwork" }
          ].map((item, idx) => (
        <a key={idx} href={item.link} className="bg-green-500 text-white font-semibold py-4 rounded-md hover:bg-green-600 transition-transform transform-gpu duration-300 hover:scale-105 fade-in delay-400">
          {item.text}
        </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <button className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 pt-2 rounded-full shadow-lg hover:bg-blue-600 scroll-to-top">↑</button>
    </div>
  );
}
