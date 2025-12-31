import React, { useEffect, useRef, useState } from 'react';
import EventCard from '@/components/shared/eventCard';
import { auth } from '@/firebase/firebase';
import { getStudentById, getRecommendedEvents } from '@/firebase/collections';

const RecommendedSection = () => {
  
  const scrollContainerRef = useRef(null);
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interest,setInterest] = useState([]);
  
  useEffect(()=>{
    const fetchRecommendations = async () =>{
      const user = auth.currentUser;
      if (!user) return;
      const student = await getStudentById(user.uid);
      console.log("STUDENT DOC:", student)
      const interest = student.preferences?.interest || [];
      setInterest(interest);
      console.log("INTERESTS:", interest);
      const recommended = await getRecommendedEvents(interest);
      console.log("RECOMMENDED EVENTS:", recommended);
      setEvents(recommended);
      setLoading(false);
    }
    fetchRecommendations();

  },[]);

  if(loading) return null;

  if (interest.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white border rounded-md p-6 text-center">
          <h2 className="text-xl font-semibold">
            Select your interests
          </h2>
          <p className="text-gray-500 mt-2">
            Choose interests in settings to get personalized event recommendations.
          </p>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-[24px] font-bold text-gray-900 tracking-wide uppercase">
              Recommended For You
            </h2>
            {/* <p className="text-gray-500 font-light  mt-1">
              Events that match your interests and free time.
            </p> */}
          </div>
        </div>       
        <div className="bg-white border rounded-md p-6 text-center">
        
          <h2 className="text-xl font-semibold">
            No events based on your interests
          </h2>
          <p className="text-gray-500 mt-2">
            Try updating your interests or check back later.
          </p>
        </div>
      </section>
    );
  }

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (loading || !events.length) return null;
  if (loading) return <p className="p-6">Loading recommendations...</p>;
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
        {events.map((event) => (
          <EventCard 
            key={event.id}
            {...event}
            variant="details" 
            path={`/student/events/${event.id}`}
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