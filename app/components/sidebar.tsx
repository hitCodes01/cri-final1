import React from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <div className="font-sans w-64 bg-blue-600 flex flex-col justify-between p-5 shadow-md">
      <div className="flex flex-col space-y-5">
        <Link
          href="/dashboard/profile" 
          className="no-underline text-white text-xl p-3 rounded-md flex items-center transition-colors hover:bg-blue-700"
        >
          <img
            src="https://icon-library.com/images/dashboard-icon/dashboard-icon-16.jpg"
            className="w-5 h-5 mr-3 filter invert brightness-200"
            alt="User Icon"
          />
          User Dashboard
        </Link>
        
        <Link
          href="/dashboard/resourcelibrary" 
          className="no-underline text-white text-xl p-3 rounded-md flex items-center transition-colors hover:bg-blue-700"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/17871/17871590.png"
            className="w-5 h-5 mr-3 filter invert brightness-200"
            alt="Resource Icon"
          />
          Resource Library
        </Link>
        
        <Link
          href="/dashboard/techsupport" 
          className="no-underline text-white text-xl p-3 rounded-md flex items-center transition-colors hover:bg-blue-700"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/11481/11481942.png"
            className="w-5 h-5 mr-3 filter invert brightness-200"
            alt="Support Icon"
          />
          Technical Support
        </Link>
        
        <Link
          href="/dashboard/DownloadReport" 
          className="no-underline text-white text-xl p-3 rounded-md flex items-center transition-colors hover:bg-blue-700"
        >
          <img
            src="https://static.thenounproject.com/png/2082751-200.png"
            className="w-5 h-5 mr-3 filter invert brightness-200"
            alt="Download Icon"
          />
          Download Reports
        </Link>
      </div>
      
      {/* Return to Home */}
      <div className="w-full p-5 text-center">
        <hr className="border-t border-white/20 my-5" />
        <Link
          href="/" 
          className="no-underline text-white text-base p-3 rounded-lg inline-flex items-center justify-center bg-blue-500 font-semibold shadow-md hover:bg-blue-600 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 9.75L12 3l9 6.75V21H3V9.75z"
            />
          </svg>
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;