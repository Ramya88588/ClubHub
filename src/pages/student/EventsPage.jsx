import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import Navigation Hook
import EventCard from '@/components/shared/eventCard';
import { getUpcomingEvents } from '@/firebase/collections';
const UpcomingEventsSection = () => {
  // 1. EXTENDED MOCK DATA (Added 'club' field for filtering)
  // const allEvents = [
  //   { id: 1, type: "Workshop", club: "Coding Club", theme: "yellow", title: "React Patterns", description: "Advanced patterns for scaling apps.", date: "10/01/2026", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=500&q=60" },
  //   { id: 3, type: "Seminar", club: "Cloud Community", theme: "blue", title: "Cloud Computing", description: "AWS vs Azure vs GCP basics.", date: "15/01/2026", image: null },
  //   { id: 4, type: "Club", club: "Eco Warriors", theme: "green", title: "Eco-Club Meet", description: "Planning the campus tree plantation.", date: "18/01/2026", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=500&q=60" },
  //   { id: 5, type: "Music", club: "Music Society", theme: "yellow", title: "Acoustic Night", description: "Unplugged sessions at the amphitheater.", date: "20/01/2026", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=60" },
  //   { id: 7, type: "Art", club: "Creative Arts", theme: "red", title: "Sketching 101", description: "Bring your pencils and creativity.", date: "25/01/2026", image: null },
  //   { id: 8, type: "Workshop", club: "Debate Club", theme: "yellow", title: "Public Speaking", description: "Overcoming stage fear.", date: "28/01/2026", image: "https://images.unsplash.com/photo-1475721027760-f75cf5cb941c?auto=format&fit=crop&w=500&q=60" },
  //   { id: 9, type: "Coding", club: "AI Enthusiasts", theme: "blue", title: "Python for AI", description: "Intro to libraries like Pandas and NumPy.", date: "30/01/2026", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=60" },
  //   { id: 10, type: "Music", club: "Music Society", theme: "yellow", title: "Battle of Bands", description: "The ultimate rock showdown.", date: "02/02/2026", image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&w=500&q=60" },
  //   { id: 11, type: "Seminar", club: "CyberSafe", theme: "blue", title: "Cyber Security", description: "Protecting assets in the digital age.", date: "05/02/2026", image: null },
  //   { id: 12, type: "Club", club: "Eco Warriors", theme: "green", title: "Gardening Hour", description: "Weekly maintenance of the botanical garden.", date: "08/02/2026", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=500&q=60" },
  //   { id: 13, type: "Sports", club: "Sports Society", theme: "red", title: "Football Finals", description: "The big game at the main stadium.", date: "10/02/2026", image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=500&q=60" },
  //   { id: 14, type: "Workshop", club: "Placement Cell", theme: "yellow", title: "Resume Building", description: "Crafting the perfect CV for internships.", date: "12/02/2026", image: null },
  //   { id: 15, type: "Tech", club: "Crypto Club", theme: "blue", title: "Blockchain 101", description: "Understanding decentralized ledgers.", date: "14/02/2026", image: "https://images.unsplash.com/photo-1644361566696-3d442b5b482a?auto=format&fit=crop&w=500&q=60" },
  //   { id: 16, type: "Art", club: "Creative Arts", theme: "red", title: "Pottery Workshop", description: "Hands-on clay modeling session.", date: "16/02/2026", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=500&q=60" },
  //   { id: 17, type: "Coding", club: "Coding Club", theme: "blue", title: "LeetCode Grind", description: "Solving hard problems together.", date: "18/02/2026", image: null },
  //   { id: 18, type: "Seminar", club: "Future Leaders", theme: "yellow", title: "Future of Work", description: "How AI is changing job markets.", date: "20/02/2026", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&q=60" },
  // ];
  const navigate = useNavigate(); // 2. Initialize Navigation


  // 2. STATE MANAGEMENT
  const [searchTerm, setSearchTerm] = useState('');
  const [allEvents, setAllEvents] = useState([]);
  // Loading state
  const [loading, setLoading] = useState(true);
  // New Filter States
  const [dateFilter, setDateFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [clubFilter, setClubFilter] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3. UPDATED to 9 items (3x3 grid)

  //Fetching firestore users
  useEffect(()=>{
    const fetchEvents = async()=>{
      const data = await getUpcomingEvents();
      setAllEvents(data);
      setLoading(false);
      
    };
    fetchEvents();
  },[]);


  // 3. FILTER 

  //filter data (Helper Arrays for Dropdowns)
  const eventTypes = ["Workshop", "Seminar", "Club", "Music", "Tech", "Art", "Sports", "Coding"];
  const clubNames = ["Coding Club", "Sports Society", "Music Society", "Creative Arts", "Eco Warriors", "Debate Club", "AI Enthusiasts", "Cloud Community"];

  // Filter logic
  const filteredEvents = allEvents.filter((event) => {
    // Search Logic
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Type Logic
    const matchesType = typeFilter === '' || event.type === typeFilter;

    // Club Logic
    const matchesClub = clubFilter === '' || event.clubname === clubFilter;

    // Date Logic
    let matchesDate = true;
    if (dateFilter) {
      const [day, month, year] = event.date.split('/');
      const eventDateObj = new Date(year, month - 1, day);
      const filterDateObj = new Date(dateFilter);
      
      eventDateObj.setHours(0,0,0,0);
      filterDateObj.setHours(0,0,0,0);

      matchesDate = eventDateObj >= filterDateObj;
    }
    
    return matchesSearch && matchesType && matchesClub && matchesDate;
  });

  // 4. PAGINATION LOGIC
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, dateFilter, typeFilter, clubFilter]);

  // Handlers
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);

  // Helper to clear all filters
  const clearFilters = () => {
    setDateFilter('');
    setTypeFilter('');
    setClubFilter('');
  };

  return (
    <div className="mt-18 max-w-7xl p-16 bg-[#f8f9fa]">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 mt-1">Ready to explore what's happening on campus today?</p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Search events..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-sm"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </div>
      </div>
      
      {/* MAIN CONTAINER */}
      <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
        
        {/* NEW FILTER BAR (Updated Layout) */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-8 gap-6">
          <h2 className="text-lg font-semibold text-gray-800 whitespace-nowrap">
            Upcoming Events <span className="text-gray-400 text-sm font-normal ml-2">({filteredEvents.length} found)</span>
          </h2>
          
          {/* Filter Controls Group */}
          <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto items-center">
            
            {/* 1. Date Picker */}
            <div className="relative w-full sm:w-auto">
               <input 
                 type="date" 
                 value={dateFilter}
                 onChange={(e) => setDateFilter(e.target.value)}
                 className="w-full sm:w-auto pl-4 pr-10 py-2 bg-gray-50 border-0 rounded-lg text-sm text-gray-600 focus:ring-0 cursor-pointer hover:bg-gray-100 transition-colors"
               />
               <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
               </span>
            </div>

            {/* 2. Type Dropdown */}
            <div className="relative w-full sm:w-auto">
              <select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="appearance-none w-full sm:w-40 pl-4 pr-10 py-2 bg-gray-50 border-0 rounded-lg text-sm text-gray-600 focus:ring-0 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <option value="">Any Type</option>
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            {/* 3. Club Dropdown */}
            <div className="relative w-full sm:w-auto">
              <select 
                value={clubFilter}
                onChange={(e) => setClubFilter(e.target.value)}
                className="appearance-none w-full sm:w-48 pl-4 pr-10 py-2 bg-gray-50 border-0 rounded-lg text-sm text-gray-600 focus:ring-0 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <option value="">Any Club</option>
                {clubNames.map(club => (
                  <option key={club} value={club}>{club}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            {/* Clear Filters Link */}
            {(dateFilter || typeFilter || clubFilter) && (
              <button 
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-800 font-medium underline decoration-gray-300 underline-offset-4 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* THE GRID */}
        {currentEvents.length > 0 ? (
          <div className="flex flex-wrap gap-12 mb-12 px-4">
            {currentEvents.map((event) => (
              <div 
                key={event.id}
                onClick={() => navigate(`/student/events/${event.id}`)} // 4. Navigation Handler
                className="cursor-pointer transition-transform hover:scale-[1.01] duration-200"
              >
                <EventCard 
                  {...event}
                  variant="details"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-50 p-4 rounded-full mb-3">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-gray-900 font-medium">No events found</h3>
            <p className="text-gray-500 text-sm mt-1">Try adjusting your filters or search term.</p>
            <button onClick={clearFilters} className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">Clear all filters</button>
          </div>
        )}

        {/* DYNAMIC PAGINATION */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 select-none border-t border-gray-100 pt-8">
            <button 
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-3 py-1 hover:text-gray-900 disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"
            >
              First
            </button>
            <button 
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-3 py-1 hover:text-gray-900 disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"
            >
              Prev
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => handlePageClick(number)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  currentPage === number 
                    ? 'bg-black text-white shadow-md transform scale-105' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                {number}
              </button>
            ))}
            
            <button 
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-3 py-1 hover:text-gray-900 disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"
            >
              Next
            </button>
            <button 
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 hover:text-gray-900 disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"
            >
              Last
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default UpcomingEventsSection;