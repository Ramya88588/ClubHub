import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mapImg from "@/assets/map.png";
import { getEventById } from "@/firebase/collections";
// Using a URL fallback since local assets might not render in this preview

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80";


const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock Database
  // const eventsData = {
  //   1: {
  //     id: 1,
  //     title: "React Patterns Workshop",
  //     club: "Coding Club",
  //     type: "Workshop",
  //     date: "October 10, 2026",
  //     time: "10:00 AM - 4:00 PM",
  //     location: "Main Auditorium, Block A",
  //     image:
  //       "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
  //     description:
  //       "Join us for an intensive deep dive into advanced React patterns. We will cover Higher-Order Components, Render Props, Custom Hooks, and the latest React Server Components. This workshop is designed for developers who want to scale their applications efficiently.",
  //     highlights: [
  //       "Master Custom Hooks for reusable logic",
  //       "Deep dive into React Server Components (RSC)",
  //       "Performance optimization techniques",
  //       "Live coding sessions with industry experts",
  //       "Networking with 50+ developers",
  //     ],
  //     gFormLink: "https://docs.google.com/forms/d/e/1FAIpQLSfDxk...",
  //     organizer: "Sarah Jenkins",
  //     contact: "sarah.j@university.edu",
  //     registeredMembers:100
  //   },
  //   2: {
  //     id: 2,
  //     title: "Badminton Open Championship",
  //     club: "Sports Society",
  //     type: "Sports",
  //     date: "January 12, 2026",
  //     time: "9:00 AM - 6:00 PM",
  //     location: "University Sports Complex",
  //     image:
  //       "https://images.unsplash.com/photo-1626224583764-84786c713cd3?auto=format&fit=crop&w=1200&q=80",
  //     description:
  //       "The annual Inter-college Badminton Championship is here! Watch the best players from across the campus compete for the trophy. Open to all students and faculty.",
  //     highlights: [
  //       "Singles and Doubles categories",
  //       "Professional referees",
  //       "Cash prizes worth $500",
  //       "Refreshments provided for all participants",
  //       "Finals streamed live on campus TV",
  //     ],
  //     gFormLink: "https://docs.google.com/forms/u/0/",
  //     organizer: "Coach Mike",
  //     contact: "sports@university.edu",
  //     registeredMembers:50
  //   },
  //   default: {
  //     id: 0,
  //     title: "Event Details Unavailable",
  //     club: "Unknown Club",
  //     type: "Event",
  //     date: "TBD",
  //     time: "TBD",
  //     location: "TBD",
  //     image:
  //       "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80",
  //     description: "We couldn't find the details for this specific event.",
  //     highlights: [],
  //     gFormLink: "#",
  //     organizer: "N/A",
  //     contact: "help@university.edu",
  //     registeredMembers:0,
  //   },
  // };

  // Fallback to default if ID not found
  //const event = eventsData[id] || eventsData.default;
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
        console.error("Error fetching event:", err);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center">Loading event...</div>;
  }

  if (!event) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">Event not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-500 underline"
        >
          Go back
        </button>
      </div>
    );
  }


  const handleRegister = () => {
    if (event.gFormLink && event.gFormLink !== "#") {
      window.open(event.gFormLink, "_blank");
    } else {
      alert("Registration link not available yet.");
    }
  };

  const registeredMembers = event.registeredUsers?.length || 0;
  const image = event.image || FALLBACK_IMAGE;

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-4 md:px-12 md:py-4 animate-fade-in ">
      <div className="max-w-4xl mx-auto">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-gray-500 hover:text-gray-900 transition-colors group "
        >
          <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center mr-2 group-hover:bg-gray-100 transition-colors">
            <svg
              className="w-3 h-3 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <span className="text-sm">Back to Events</span>
        </button>

        {/* MAIN GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN (Image & Desc) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main Image */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-45 bg-gray-200 relative group">
              <img
                src={image}
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
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-sm font-medium">
                  by {event.head || "Club"}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
                {event.title}
              </h1>
              {/* <p className="text-gray-500 flex items-center gap-2 text-sm">
                <svg
                  className="w-5 h-5 text-red-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                {event.location}
              </p> */}
            </div>

            {/* Description & Highlights */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  About the Event
                </h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line mb-3 text-sm">
                  {event.description}
                </p>

                {/* Highlights Section */}
                {event.highlights && event.highlights.length > 0 && (
                  <div className="mt-5 pt-8 border-t border-gray-100">
                    <h4 className="text-xl font-bold text-gray-900 mb-6">
                      Event Highlights
                    </h4>

                    {/* FLEX COLUMN LAYOUT */}
                    <div className="flex flex-col gap-4">
                      {event.highlights.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-sm font-medium leading-relaxed">
                            {item}
                          </span>
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
              <div className="h-30 bg-gray-100 relative group cursor-pointer">
                <img
                  src={mapImg}
                  alt="Location Map"
                  className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                />
                {/* UNCOMMENTED and Refined Map Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm border border-gray-100 flex items-center gap-1">
                    <svg
                      className="w-3 h-3 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    View on Map
                  </span>
                </div>
              </div>

              <div className="p-3">
                <h3 className="text-md font-bold text-gray-900 pb-2 border-b border-gray-100">
                  Event Details
                </h3>

                <div className="space-y-6">
                  {/* Date Row */}
                  <div className="flex items-start gap-2 mt-2">
                    <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div >
                      <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">
                        Date
                      </p>
                      <p className="text-gray-900 text-xs font-semibold">
                        {event.date}
                      </p>
                    </div>
                  </div>

                  {/* Time Row */}
                  <div className="flex items-start gap-2">
                    <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">
                        Time
                      </p>
                      <p className="text-gray-900 text-xs font-semibold">
                        {event.time}
                      </p>
                    </div>
                  </div>

                  {/* Location Row */}
                  <div className="flex items-start gap-2">
                    <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
                      <svg
                        className="w-5 h-5 text-gray-600"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">
                        Location
                      </p>
                      <p className="text-gray-900 text-xs font-semibold ">
                        {event.location}
                      </p>
                    </div>
                  </div>

                  {/* Club Row */}
                  <div className="flex items-start gap-2">
                    <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">
                        Club
                      </p>
                      <p className="text-gray-900 font-semibold text-xs">
                        {event.clubname}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                {/* Action Section */}
                <div className="mt-2 pt-6 border-t border-gray-100">
                  <div className="flex flex-col gap-4">
                    {/* Registered Members */}
                    <div className="text-center">
                      <p className="text-sm text-gray-500">
                       Registered Members
                      </p>
                      <p className="text-2xl font-extrabold text-gray-900">
                         {event.registeredUsers?.length || 0}
                      </p>
                    </div>

                    {/* Delete Button */}
                    <button className="py-2 bg-red-500 text-white rounded-xl   hover:bg-red-600 transition active:scale-95 shadow">
                      Delete Event
                    </button>

                    {/* Edit Button */}
                    <button
                      onClick={() => navigate(`/club/edit-event/${event.id}`)}
                      className="py-2 border border-red-500 text-red-500 rounded-xl hover:bg-red-50 transition active:scale-95"
                    >
                      Edit Event
                    </button>
                  </div>
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
