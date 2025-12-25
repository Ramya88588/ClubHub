import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mapImg from "@/assets/map.png"
// Using a URL fallback since local assets might not render in this preview


const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock Database
  const eventsData = {
    "1": {
      id: 1,
      title: "React Patterns Workshop",
      club: "Coding Club",
      type: "Workshop",
      date: "October 10, 2026",
      time: "10:00 AM - 4:00 PM",
      location: "Main Auditorium, Block A",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
      description: "Join us for an intensive deep dive into advanced React patterns. We will cover Higher-Order Components, Render Props, Custom Hooks, and the latest React Server Components. This workshop is designed for developers who want to scale their applications efficiently.",
      highlights: [
        "Master Custom Hooks for reusable logic",
        "Deep dive into React Server Components (RSC)",
        "Performance optimization techniques",
        "Live coding sessions with industry experts",
        "Networking with 50+ developers"
      ],
      gFormLink: "https://docs.google.com/forms/d/e/1FAIpQLSfDxk...", 
      organizer: "Sarah Jenkins",
      contact: "sarah.j@university.edu"
    },
    "2": {
      id: 2,
      title: "Badminton Open Championship",
      club: "Sports Society",
      type: "Sports",
      date: "January 12, 2026",
      time: "9:00 AM - 6:00 PM",
      location: "University Sports Complex",
      image: "https://images.unsplash.com/photo-1626224583764-84786c713cd3?auto=format&fit=crop&w=1200&q=80",
      description: "The annual Inter-college Badminton Championship is here! Watch the best players from across the campus compete for the trophy. Open to all students and faculty.",
      highlights: [
        "Singles and Doubles categories",
        "Professional referees",
        "Cash prizes worth $500",
        "Refreshments provided for all participants",
        "Finals streamed live on campus TV"
      ],
      gFormLink: "https://docs.google.com/forms/u/0/",
      organizer: "Coach Mike",
      contact: "sports@university.edu"
    },
    "default": {
      id: 0,
      title: "Event Details Unavailable",
      club: "Unknown Club",
      type: "Event",
      date: "TBD",
      time: "TBD",
      location: "TBD",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80",
      description: "We couldn't find the details for this specific event.",
      highlights: [],
      gFormLink: "#",
      organizer: "N/A",
      contact: "help@university.edu"
    }
  };

  // Fallback to default if ID not found
  const event = eventsData[id] || eventsData.default;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleRegister = () => {
    if (event.gFormLink && event.gFormLink !== "#") {
      window.open(event.gFormLink, '_blank');
    } else {
      alert("Registration link not available yet.");
    }
  };

  if (!event) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 md:p-12 font-sans animate-fade-in">
      <div className="max-w-6xl mx-auto"> 

        {/* BACK BUTTON */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-gray-500 hover:text-gray-900 transition-colors group "
        >
          <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center mr-2 group-hover:bg-gray-100 transition-colors">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </div>
          <span className="font-medium">Back to Events</span>
        </button>

        {/* MAIN GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN (Image & Desc) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Image */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-124 bg-gray-200 relative group">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
              {/* Overlay Badge for Main Image */}
              <div className="absolute top-4 left-4">
                 <span className="px-3 py-1 bg-white/90 backdrop-blur text-blue-700 text-xs font-bold uppercase tracking-wide rounded-full shadow-sm">
                   {event.type}
                 </span>
              </div>
            </div>

            {/* Header Section (Moved inside left column as per your layout) */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                 <span className="text-gray-500 text-sm font-medium">by {event.organizer}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                {event.title}
              </h1>
              <p className="text-gray-500 flex items-center gap-2 text-lg">
                <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {event.location}
              </p>
            </div>

            {/* Description & Highlights */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">About the Event</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line mb-8">
                  {event.description}
                </p>

                {/* Highlights Section */}
                {event.highlights && event.highlights.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <h4 className="text-lg font-bold text-gray-900 mb-6">Event Highlights</h4>
                    
                    {/* FLEX COLUMN LAYOUT */}
                    <div className="flex flex-col gap-4">
                      {event.highlights.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                            <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <span className="text-gray-700 text-sm font-medium leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (Details Box) */}
          <div className="lg:col-span-1">
            {/* REMOVED sticky top-8 here to fix scrolling issue */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              
              {/* Map Image at Top of Sidebar */}
              <div className="h-60 bg-gray-100 relative group cursor-pointer">
                <img 
                  src={mapImg}
                  alt="Location Map" 
                  className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                />
                {/* UNCOMMENTED and Refined Map Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm border border-gray-100 flex items-center gap-1">
                      <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/></svg>
                      View on Map
                    </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                  Event Details
                </h3>

                <div className="space-y-6">
                  {/* Date Row */}
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Date</p>
                      <p className="text-gray-900 font-semibold text-base">{event.date}</p>
                    </div>
                  </div>

                  {/* Time Row */}
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Time</p>
                      <p className="text-gray-900 font-semibold text-base">{event.time}</p>
                    </div>
                  </div>

                  {/* Location Row */}
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
                       <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                       </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Location</p>
                      <p className="text-gray-900 font-semibold text-base">{event.location}</p>
                    </div>
                  </div>
                  
                  {/* Club Row */}
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Club</p>
                      <p className="text-gray-900 font-semibold text-base">{event.club}</p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col">
                  <button className="w-full py-4 border border-black rounded-xl font-bold text-lg hover:bg-gray-50 transition-transform active:scale-95 shadow-sm flex justify-center items-center gap-2 mb-4">
                    Share With your friends
                  </button>
                  <button 
                    onClick={handleRegister}
                    className="w-full py-4 bg-blue-500 text-white rounded-xl font-bold text-lg hover:bg-blue-400 transition-transform active:scale-95 shadow-lg flex justify-center items-center gap-2"
                  >
                    Register Now
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-3">
                    Clicking will open the registration form in a new tab.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;