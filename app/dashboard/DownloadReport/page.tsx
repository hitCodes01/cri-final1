"use client";
import React from "react";
import Sidebar from "../../components/sidebar";

const TablePage: React.FC = () => {
  const tableData = [
    { modelName: "ClimaSynapse™", lastVisited: "2024-12-20" },
    { modelName: "EcoGuard™", lastVisited: "2024-12-15" },
    { modelName: "AdaptNet™", lastVisited: "2024-12-10" },
    { modelName: "InfraPredict™", lastVisited: "2024-12-15" },
    { modelName: "SocioMap®", lastVisited: "2024-12-10" },
  ];

  return (
    <div 
      className="flex w-screen h-screen bg-cover bg-center bg-no-repeat text-white m-0 p-0 overflow-hidden"
      style={{
        backgroundImage: 
        "url('https://media.istockphoto.com/id/1529303245/photo/cloud-technology-internet-network-concept-hand-holding-smartphone-tablet-with-cloud-computing.jpg?s=612x612&w=0&k=20&c=yzQwJKUEVn1kFetNdPfxnCi4AdLCiyv7vRwnICWqv_k=')"
      }}
    >
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-5">
        <div className="bg-black/80 rounded-xl p-5 shadow-lg max-w-4xl w-full">
          <h4 className="text-center text-white text-2xl font-bold mb-5">
            Download Reports
          </h4>
          
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="w-full bg-white text-black">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-center font-semibold">Name of Model</th>
                  <th className="p-3 text-center font-semibold">Last Visited</th>
                  <th className="p-3 text-center font-semibold">Download Report</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50/10">
                    <td className="p-3 text-center">{row.modelName}</td>
                    <td className="p-3 text-center">{row.lastVisited}</td>
                    <td className="p-3 text-center">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablePage;