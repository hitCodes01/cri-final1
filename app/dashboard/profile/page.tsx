"use client";
import React from "react";
import Sidebar from "../../components/sidebar";

const MainDashboard: React.FC = () => {
  return (
    <div 
      className="flex w-screen h-screen bg-cover bg-center bg-no-repeat text-white m-0 p-0 overflow-hidden"
      style={{
        backgroundImage: 
        "url('https://img.freepik.com/free-vector/abstract-big-data-digital-technology-background-design_1017-22920.jpg')"
      }}
    >
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center text-center p-5">
        <h2 className="text-5xl font-bold mb-5">
          Welcome to Your Dashboard
        </h2>
        <p className="max-w-xl text-xl text-center leading-relaxed">
          Access all the key features of your application from one place. Use
          the navigation on the left to explore User Dashboard, Resource
          Library, and Technical Support.
        </p>
      </div>
    </div>
  );
};

export default MainDashboard;