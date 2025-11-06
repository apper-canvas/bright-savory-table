import React from "react";

const Loading = ({ message = "Loading delicious content..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-accent rounded-full animate-spin animate-reverse"></div>
      </div>
      <p className="mt-4 text-secondary font-medium">{message}</p>
      
      {/* Skeleton Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-4xl">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="bg-surface rounded-xl shadow-md overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 loading-shimmer"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded loading-shimmer"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 loading-shimmer"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/2 loading-shimmer"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;