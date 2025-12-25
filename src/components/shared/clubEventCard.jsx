import React from "react";

const getThemeClasses = (theme) => {
  const variants = {
    yellow: {
      badge: "bg-yellow-100 text-yellow-800",
      edit: "bg-red-100 text-red-600",
    },
    blue: {
      badge: "bg-blue-100 text-blue-800",
      edit: "bg-red-100 text-red-600",
    },
  };
  return variants[theme] || variants.yellow;
};

const ClubEventCard = ({
  title,
  description,
  date,
  type,
  theme = "yellow",
  image,
}) => {
  const colors = getThemeClasses(theme);
   
  return (
    <div className="min-w-70 w-70 bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm flex flex-col snap-center hover:shadow-md h-85">

      {/* Image Section */}
      <div className="relative h-[50%] bg-gray-50 flex items-center justify-center border-b">

        {/* Type Badge */}
        <span
          className={`absolute top-3 left-3 px-2 py-0.5 text-xs rounded ${colors.badge}`}
        >
          {type}
        </span>

        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            className="w-10 h-10 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-1">
        <h3 className="text-base font-semibold text-gray-900">
          {title}
        </h3>

        <p className="text-sm text-gray-500">
          On {date}
        </p>

        <p className="text-sm text-gray-500">
          Registered Users: --
        </p>
      </div>

      {/* Footer */}
      <div className="px-4 border-t flex mt-2 pt-2 justify-between">
        <button
          className={`px-10 py-1.5 rounded text-sm ${colors.edit}`}
        >
          Edit
        </button>

        <button className="p-2 rounded-full hover:bg-blue-50 transition">
          <svg
            className="w-5 h-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ClubEventCard;
