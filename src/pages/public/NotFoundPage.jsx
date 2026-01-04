import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-md w-full text-center">
        {/* Logo-like header */}
        <div className="text-5xl font-medium tracking-tight mb-6">
          <span className="text-blue-600">4</span>
          <span className="text-red-500">0</span>
          <span className="text-yellow-500">4</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-medium text-gray-900">That’s an error.</h1>

        {/* Description */}
        <p className="text-gray-600 mt-3 leading-relaxed text-md">
          The requested URL was not found on this server.
          <br />
          That’s all we know.
        </p>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-8" />

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer px-5 py-2 text-sm rounded-md text-gray-700 border border-gray-300 hover:bg-gray-100 transition"
          >
            Go back
          </button>

          <button
            onClick={() => navigate("/")}
            className="cursor-pointer px-5 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-500 transition"
          >
            Go to home
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-10">
          Error 404 · Page not found
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
