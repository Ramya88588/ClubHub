import React, { useState, useMemo } from 'react';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  useNavigate 
} from 'react-router-dom';
import { 
  Search, 
  ArrowRight, 
  Users, 
  Code, 
  Mic, 
  Palette, 
  Cpu, 
  Globe,
  ChevronDown,
  ExternalLink,
  Mail
} from 'lucide-react';


const ClubInfo = () => {
  const navigate = useNavigate();

  // --- STATE FOR FILTERS ---
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // --- MOCK DATA ---
  
  const announcements=[
    {
      id:1,
      name:"The Coding Club",
      description:"The Event code your way has been postponed due to some technical issues"
    },
    {
      id:2,
      name:"The Arts Club",
      description:"The Event Art competition has been started"
    }
  ]
    const clubs = [
    {
      id: 1,
      name: "Coding Club",
      category: "Technology",
      hiringStatus: "Hiring", // Status: Hiring
      applyLink: "https://docs.google.com/forms/", // Google Form Link
      email: "coding.club@college.edu",
      description: "A community of developers building real-world projects, hosting hackathons, and learning modern tech stacks like React, Node.js, and AI.",
      icon: Code,
      color: "bg-blue-600",
      members: "1.2k"
    },
    {
      id: 2,
      name: "Robotics Society",
      category: "Technology",
      hiringStatus: "Closed", // Status: Closed
      applyLink: "#",
      email: "robotics.head@college.edu",
      description: "Designing and building autonomous robots. We participate in national competitions and hold workshops on Arduino and IoT.",
      icon: Cpu,
      color: "bg-indigo-600",
      members: "850"
    },
    {
      id: 3,
      name: "Art & Design",
      category: "Arts",
      hiringStatus: "Hiring",
      applyLink: "https://docs.google.com/forms/",
      email: "arts.design@college.edu",
      description: "For the creatives. We organize exhibitions, UI/UX workshops, and sketching sessions to foster artistic expression.",
      icon: Palette,
      color: "bg-pink-500",
      members: "600"
    },
    {
      id: 4,
      name: "Debate Club",
      category: "Oratory",
      hiringStatus: "Opening Soon", // Status: Opening Soon
      applyLink: "#",
      email: "debate.society@college.edu",
      description: "Fostering critical thinking and public speaking skills through competitive debating, model UNs, and weekly group discussions.",
      icon: Mic,
      color: "bg-orange-500",
      members: "450"
    },
    {
      id: 5,
      name: "Social Service",
      category: "Social",
      hiringStatus: "Open", // Treating 'Open' same as 'Hiring' for this example
      applyLink: "https://docs.google.com/forms/",
      email: "nss@college.edu",
      description: "Giving back to the community through organized drives, teaching sessions for underprivileged kids, and environmental campaigns.",
      icon: Globe,
      color: "bg-green-600",
      members: "1.5k"
    }
  ];

  // --- LOGIC: EXTRACT CATEGORIES ---
  // Dynamically create a list of unique categories from the data + 'All'
  const categories = ["All", ...new Set(clubs.map((club) => club.category))];

  // --- LOGIC: FILTERING & SEARCH ---
  const filteredClubs = useMemo(() => {
    return clubs.filter((club) => {
      // 1. Category Filter Logic
      // If 'All' is selected, return true. Otherwise, check if club.category matches activeCategory.
      const matchesCategory =
        activeCategory === "All" || club.category === activeCategory;

      // 2. Search Filter Logic
      // Convert both club name and search query to lowercase to ensure case-insensitive matching.
      const matchesSearch = club.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Return true only if BOTH conditions are met
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, clubs]);

  return (
    <div className="bg-[#f8f9fa] font-sans text-gray-900 mt-18 pb-10">
      {/* HEADER */}
      <div className="">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div className="w-[50%]">
              <h1 className="text-[32px] font-extrabold mb-1">
                Club Hiring and Contact
              </h1>
              <p className=" text-[24px] font-light">
                Explore active student organizations, view current recruitment
                status and connect with club leaders
              </p>
            </div>

            <div className="relative w-[40%] md:w-96">
              <input
                type="text"
                placeholder="Search Clubs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-sm"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* CONTROL BAR: Search & Categories */}
          <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Filter Dropdown */}
          </div>
        </div>
      </div>

      {/* CLUBS GRID */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-4 bg-white rounded-3xl">
        <div className="relative self-end">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="w-full md:w-48 appearance-none bg-gray-100 border-none rounded-xl py-3 pl-4 pr-10 focus:ring-2 focus:ring-blue-500/20 outline-none font-medium cursor-pointer justify-end"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ">
            <ChevronDown size={20} />
          </div>
        </div>
        <div>
          {filteredClubs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClubs.map((club) => (
                <div
                  key={club.id}
                  className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full cursor-pointer"
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl ${club.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}
                    >
                      <club.icon size={28} />
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        club.hiringStatus === "Hiring" ||
                        club.hiringStatus === "Open"
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-gray-100 text-gray-600 border border-gray-200"
                      }`}
                    >
                      {club.hiringStatus}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {club.name}
                      </h3>
                    </div>
                    <div className="mb-4">
                      <span className="inline-block px-2 py-1 bg-gray-100  text-xs rounded-md">
                        {club.category}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm mb-6">
                      {club.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="p-2 border-t border-gray-100 text-[16px] font-light text-black-500/75">
                        {/* CASE 1: HIRING */}
                    {(club.hiringStatus === 'Hiring' || club.hiringStatus === 'Open') && (
                      <div className="flex items-center justify-between">
                      <a 
                        href={club.applyLink}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className=" px-12 py-2 bg-blue-500 text-white rounded-sm
                        hover:bg-blue-500/50 transition-colors shadow-sm "
                      >Apply
                      </a>
                       <a 
                          href={`mailto:${club.email}`}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title={`Contact ${club.name} Head`}
                        >
                          <Mail size={18} />
                        </a>
                      </div>
                    )}

                    {/* CASE 2: OPENING SOON */}
                    {club.hiringStatus === 'Opening Soon' && (
                      <div className="flex items-center justify-between">                     <span className=" rounded-lg">
                        Applications Opening Soon
                      </span>
                      <a 
                          href={`mailto:${club.email}`}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title={`Contact ${club.name} Head`}
                        >
                          <Mail size={18} />
                        </a>
                      </div>
                    )}

                    {/* CASE 3: CLOSED (Show Email Icon) */}
                    {club.hiringStatus === 'Closed' && (
                      <div className="flex items-center justify-between">
                        <span className="">Applications closed</span>
                        <a 
                          href={`mailto:${club.email}`}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title={`Contact ${club.name} Head`}
                        >
                          <Mail size={18} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No clubs found
              </h3>
              <p className=" max-w-md mx-auto">
                We couldn't find any clubs matching "{searchQuery}" in the{" "}
                {activeCategory} category. Try adjusting your filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-6 px-6 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
       
      </main>
       <div className="border-2 shadow-lg p-5 rounded-2xl max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 m-10">
          <h1 className="text-[24px] font-semibold mb-5">Announcements</h1>
          {
            announcements.length>0 &&
            announcements.map((a)=>(
              <div key={a.id} className="p-4 rounded-lg mb-4 text-[24px] bg-white">
                <h3 className="">From <span className="text-green-500">{a.name}</span></h3>
                <p className="font-light">{a.description}</p>
              </div>
            ))
          }
        </div>
    </div>
  );
};

// --- PREVIEW WRAPPER ---
export default ClubInfo;
