import React from 'react';
import { HomeIcon, Search, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        {/* Error Code and Message */}
        <div className="select-none">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <div className="mt-4 text-xl font-semibold text-gray-800">
            Oops! Page not found
          </div>
          <p className="mt-2 text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Navigation Options */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 
                     text-gray-700 rounded-lg hover:bg-gray-50 transition-colors
                     gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          
          <button 
            onClick={() => window.location.href = '/'}
            className="inline-flex items-center justify-center px-6 py-3 
                     bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     transition-colors gap-2"
          >
            <HomeIcon className="w-4 h-4" />
            Go Home
          </button>
        </div>

        {/* Search Box */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search our site..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Help Links */}
        <div className="mt-8 text-sm text-gray-600">
          <p>Need help? Try these links:</p>
          <div className="mt-2 flex gap-4 justify-center">
            <button className="hover:text-blue-600 hover:underline">Contact Support</button>
            <button className="hover:text-blue-600 hover:underline">FAQ</button>
            <button className="hover:text-blue-600 hover:underline">Sitemap</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;