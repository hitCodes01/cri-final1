"use client";
import React from "react";
import Sidebar from "../../components/sidebar";

const ResourceLibrary: React.FC = () => {
  return (
    <div 
      className="flex w-screen h-screen bg-cover bg-center bg-no-repeat text-white m-0 p-0 overflow-hidden"
      style={{
        backgroundImage: "url('https://media.istockphoto.com/id/1349094915/photo/businessman-using-computer-laptop-for-learning-online-internet-lessons-e-learning-education.jpg?s=612x612&w=0&k=20&c=uYSlMh3BmnQUQKQJIHjGAOBJ29DWm9ClbaH5F_IR0rs=')"
      }}
    >
      <Sidebar />

      <div className="flex-1 flex flex-col items-center justify-center p-5">
        <div className="bg-black/90 rounded-xl p-5 shadow-lg max-w-[900px] w-full">
          <h4 className="text-center text-white text-2xl font-bold mb-5">
            Resource Library
          </h4>

          <div className="grid grid-cols-2 gap-5">
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow-lg p-5">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h6 className="mt-2 text-black font-semibold">User Guide 1</h6>
                <button 
                  onClick={() => window.open("#", "_blank")}
                  className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  View
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow-lg p-5">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h6 className="mt-2 text-black font-semibold">User Guide 2</h6>
                <button 
                  onClick={() => window.open("#", "_blank")}
                  className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  View
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow-lg p-5">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h6 className="mt-2 text-black font-semibold">Video Tutorial</h6>
                <button 
                  onClick={() => window.open("#", "_blank")}
                  className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Watch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceLibrary;