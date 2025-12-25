import React, { useRef } from 'react';
import EventCard from '@/components/shared/eventCard';

const RecommendedSection = () => {
  // 1. DEFINE REF
  const scrollContainerRef = useRef(null);

  // Mock Data
  const recommendations = [
    {
      id: 101,
      type: "Concert",
      theme: "yellow", // Matches image Yellow badge
      title: "Summer Vibes",
      description: "Live music festival featuring top indie bands.",
      date: "25/12/2025"
    },
    {
      id: 102,
      type: "Art",
      theme: "red", // Matches image Red badge
      title: "Modern Art Expo",
      description: "Exhibition of contemporary digital art pieces.",
      date: "28/12/2025"
    },
    {
      id: 103,
      type: "Tech",
      theme: "blue", // Matches image Blue badge
      title: "Robotics 101",
      description: "Hands-on workshop building basic robots.",
      date: "05/01/2026"
    },
    {
      id: 104,
      type: "Sports",
      theme: "green", // Matches image Green badge
      title: "Inter-College Cricket",
      description: "Final match of the season.",
      date: "12/01/2026"
    },
    {
      id: 105,
      type: "Music",
      theme: "yellow",
      title: "Jazz Night",
      description: "Smooth jazz evening at the auditorium.",
      date: "14/01/2026"
    }
  ];

  // 2. SCROLL LOGIC
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 "> {/* Added subtle bg to distinguish sections */}
      
      {/* Header Section */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-[24px] font-bold text-gray-900 tracking-wide uppercase">
            Recommended For You
          </h2>
          <p className="text-gray-500 font-light  mt-1">
            Events that match your interests and free time.
          </p>
        </div>
        
        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <button 
            onClick={() => scroll('left')}
            className="p-2 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-800 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-full hover:bg-gray-200 text-gray-800 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div 
        ref={scrollContainerRef} // <--- Don't forget this!
        className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scroll-smooth hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {recommendations.map((event) => (
          <EventCard 
            key={event.clubId}
            {...event}
            variant="details" // <--- THIS SWITCHES THE UI TO ARROW STYLE
          />
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-2">
        <div className="w-2.5 h-2.5 rounded-full bg-gray-600 cursor-pointer"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer transition-colors"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer transition-colors"></div>
      </div>

    </section>
  );
};

export default RecommendedSection;