import React from "react";

const Loader = ({
  message = "Loading...",
  subMessage,
  variant = "spinner", // "spinner" | "skeleton"
}) => {
  if (variant === "skeleton") {
    return (
      <div className="min-h-screen bg-[#f8f9fa] p-10 relative">
        {/* MESSAGE OVERLAY */}
        {(message || subMessage) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
            <div className="bg-white/80 backdrop-blur px-6 py-4 rounded-lg text-center shadow-sm">
              <p className="text-sm font-medium text-gray-700">{message}</p>
              {subMessage && (
                <p className="text-xs text-gray-500 mt-1">{subMessage}</p>
              )}
            </div>
          </div>
        )}

        {/* SKELETON CONTENT */}
        <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
          {/* Header */}
          <div className="h-8 w-64 bg-gray-200 rounded" />
          <div className="h-4 w-96 bg-gray-200 rounded" />

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="h-24 bg-white rounded-lg" />
            <div className="h-24 bg-white rounded-lg" />
            <div className="h-24 bg-white rounded-lg" />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-56 bg-white rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // SPINNER VARIANT
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-sm text-gray-600 font-medium">{message}</p>
        {subMessage && <p className="text-xs text-gray-400">{subMessage}</p>}
      </div>
    </div>
  );
};

export default Loader;
