import React from 'react';

const LoadingPage = ({ message = "Loading...", showSpinner = true }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center p-8">
        {showSpinner && (
          <div className="relative mb-8">
            {/* Main spinning circle */}
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            
            {/* Inner pulsing dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
        
        {/* Loading text with animation */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 animate-pulse">
            {message}
          </h2>
          
          {/* Animated dots */}
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          
          {/* Progress bar */}
          <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto mt-6 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse"></div>
          </div>
          
          <p className="text-gray-600 text-sm mt-4">
            Please wait while we prepare your content
          </p>
        </div>
      </div>
    </div>
  );
};

// Alternative minimal loading component
export const MinimalLoader = ({ size = "md", color = "blue" }) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4"
  };
  
  const colorClasses = {
    blue: "border-blue-200 border-t-blue-600",
    gray: "border-gray-200 border-t-gray-600",
    green: "border-green-200 border-t-green-600",
    red: "border-red-200 border-t-red-600"
  };
  
  return (
    <div className="flex items-center justify-center p-4">
      <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin`}></div>
    </div>
  );
};

// Skeleton loading component
export const SkeletonLoader = ({ lines = 3 }) => {
  return (
    <div className="animate-pulse p-6 space-y-4">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="h-4 bg-gray-200 rounded"></div>
      ))}
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
};

// Card loading skeleton
export const CardSkeleton = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 animate-pulse">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );
};

export default LoadingPage;