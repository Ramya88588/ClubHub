import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mapImg from "@/assets/map.png";
import {
  getEventById,
  registerForEvent,
  unregisterFromEvent,
  trackEventView,
} from "@/firebase/collections";
import { auth } from "@/firebase/firebase";
import RegisterModal from "@/components/shared/RegisterModal";

// Using a URL fallback since local assets might not render in this preview

const EventDetailsPage = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const student = {
    name: auth.currentUser?.displayName || "Student",
    email: auth.currentUser?.email || "",
  };

  const { id } = useParams();
  const navigate = useNavigate();
  //Fallback image
  const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80";
  const [isRegistered, setIsRegistered] = useState(false);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!event?.id) return;

    const key = `viewed_event_${event.id}`;

    if (!sessionStorage.getItem(key)) {
      trackEventView(event.id);
      sessionStorage.setItem(key, "true");
    }
  }, [event?.id]);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    if (!event || !auth.currentUser) return;

    const uid = auth.currentUser.uid;

    // ✅ PRIMARY SOURCE OF TRUTH
    if (Array.isArray(event.registeredUsers)) {
      setIsRegistered(event.registeredUsers.includes(uid));
    }
  }, [event]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleRegister = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please login to register");
      return;
    }

    // ✅ COUNT CLICK (interest)
    await updateDoc(doc(db, "events", event.id), {
      "analytics.clicks": increment(1),
    });

    // ✅ Open registration link
    if (event.gFormLink && event.gFormLink !== "#") {
      window.open(event.gFormLink, "_blank");
    } else {
      alert("Registration link not available yet.");
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!event) {
    return <div className="p-10 text-center">Event not found</div>;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 px-8 py-4 md:px-12 md:py-4 animate-fade-in ">
        <div className="max-w-4xl mx-auto">
          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center text-gray-500 hover:text-gray-900 transition-colors group "
          >
            <div className="cursor-pointer w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center mr-2 group-hover:bg-gray-100 transition-colors">
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
              <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 h-45 bg-gray-200 relative group">
                <img
                  src={event.image || FALLBACK_IMAGE}
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
                    by {event.head}
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
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
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
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
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
                      <div>
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
                          {event.time.start}
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
                          {event.location.venue}
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
                          {event.clubName}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  {/* Action Section */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex flex-col">
                      <button className="cursor-pointer w-full py-2 border border-black rounded-lg hover:bg-gray-50 transition-transform active:scale-98 shadow-sm flex justify-center items-center gap-2 mb-4">
                        Share With your friends
                      </button>

                      <button
                        onClick={async () => {
                          if (!auth.currentUser) {
                            alert("Please login first");
                            return;
                          }

                          if (isRegistered) {
                            const confirm = window.confirm(
                              "Are you sure you want to unregister?"
                            );
                            if (!confirm) return;
                            const uid = auth.currentUser.uid;
                            console.log(
                              "Before unregister:",
                              event.registeredUsers
                            );

                            await unregisterFromEvent(
                              event.id,
                              auth.currentUser.uid
                            );
                            console.log("Unregister called for:", uid);

                            setEvent((prev) => ({
                              ...prev,
                              registeredUsers: prev.registeredUsers.filter(
                                (id) => id !== uid
                              ),
                            }));

                            // 🔥 RE-CHECK FROM FIRESTORE
                          } else {
                            setShowRegisterModal(true);
                          }
                        }}
                        className="cursor-pointer w-full py-2 bg-blue-500 text-white rounded-lg  hover:bg-blue-400 transition-transform active:scale-98 shadow-lg flex justify-center items-center gap-2"
                      >
                        {isRegistered ? "Unregister" : "Register Now"}
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
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
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
      </div>

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        student={student}
        event={event}
        onConfirm={async () => {
          const uid = auth.currentUser.uid;

          await registerForEvent(event.id, uid);

          // 🔥 UPDATE LOCAL EVENT STATE
          setEvent((prev) => ({
            ...prev,
            registeredUsers: [...(prev.registeredUsers || []), uid],
          }));

          setShowRegisterModal(false);
          alert("Registration successful!");
        }}
      />
    </>
  );
};

export default EventDetailsPage;
