import React from 'react';

const getThemeClasses = (theme) => {
  const variants = {
    yellow: { badge: "bg-yellow-100 text-yellow-800", icon: "text-yellow-600" },
    red:    { badge: "bg-red-100 text-red-800",    icon: "text-red-600" },
    blue:   { badge: "bg-blue-100 text-blue-800",   icon: "text-blue-600" },
    green:  { badge: "bg-green-100 text-green-800",  icon: "text-green-600" },
  };
  return variants[theme] || variants.blue;
};

const EventCard = ({ title, description, date, type, theme, variant = 'feedback' ,image}) => {
  const colors = getThemeClasses(theme);

  return (
    <div className="min-w-70 w-70 bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm flex flex-col snap-center hover:shadow-md transition-shadow duration-300 h-90">
      
      {/* Image Area */}
      <div className="h-[50%] bg-gray-50 relative flex items-center justify-center border-b border-gray-100">
        <span className={`absolute top-4 left-4 px-3 py-1 rounded text-xs font-semibold ${colors.badge}`}>
          {type}
        </span>
        
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        ) : (
          // Fallback SVG if no image is provided
          <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )}
      </div>

      {/* Content Body */}
      <div className="p-4 h-[40%] flex flex-col">
        <h3 className=" font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm font-light text-gray-500 line-clamp-2">{description}</p>
      </div>

      {/* Dynamic Footer */}
      <div className="p-4 h-[15%] border-t flex items-center justify-between">
        <span className="text-xs text-gray-400 font-medium">On {date}</span>
        
       
        {variant === 'feedback' ? (
          // Option A: Feedback Button
          <button className={`px-4 py-2 rounded-lg text-sm text-white transition-colors ${theme === 'yellow' ? 'bg-yellow-400 hover:bg-yellow-500' : theme === 'red' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}>
            Feedback
          </button>
        ) : (
          // Option B: Blue Arrow (for Recommended)
          <button className="p-2 hover:bg-blue-50 rounded-full transition-colors group">
            <svg 
              className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;