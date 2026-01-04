import RecommendedSection from "@/components/layout/DashboardS/Recommended";
import EventCard from "@/components/shared/eventCard";
import React, { useEffect, useState, useRef } from "react";
import {
  getUpcomingRegisteredEvents,
  getStudentPastEvents,
} from "@/firebase/collections";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { getStudentById } from "@/firebase/collections";
import Loader from "@/components/shared/Loader";

const StudentDashboard = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);

  const registeredScrollRef = useRef(null);
  const pastScrollRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);

      const [upcoming, past, studentData] = await Promise.all([
        getUpcomingRegisteredEvents(user.uid),
        getStudentPastEvents(user.uid),
        getStudentById(user.uid),
      ]);

      setUpcomingEvents(upcoming);
      setPastEvents(past);
      setStudent(studentData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    console.log("CURRENT USER UID:", auth.currentUser?.uid);
  }, []);

  const scroll = (ref, direction) => {
    if (!ref.current) return;

    const scrollAmount = 320;
    ref.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <Loader
        message="Loading your dashboard…"
        subMessage="Fetching your events"
        variant="skeleton"
      />
    );
  }

  return (
    <div className="mt-16 pt-10 flex flex-col gap-10 bg-[#f2f2f2] ">
      <div className="one pl-10">
        <p className="font-semibold text-[32px]">
          Welcome back,{" "}
          <span className="text-blue-500 font-semibold text-[32px]">
            {student?.profile.displayName || "Club"}
          </span>
        </p>
        <p>
          Explore your upcoming events and give feedback on your past events
        </p>
      </div>
      <div className="two flex justify-evenly py-8 bg-white">
        <div className="uP text-blue-500 flex flex-col items-center">
          <p className="text-[36px]">{upcomingEvents.length}</p>
          <span className="font-light">Upcoming Events</span>
        </div>
        <div className="eA text-green-500 flex flex-col items-center">
          <p className="text-[36px]">{pastEvents.length}</p>
          <span className="font-light"> Events Attended</span>
        </div>
        <div className="cH text-yellow-500 flex flex-col items-center">
          <p className="text-[36px]">-</p>
          <span className="font-light">Club Hiring</span>
        </div>
      </div>
      <div className="p-6">
        <section className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] font-bold text-gray-900 tracking-wide">
              REGISTERED EVENTS
            </h2>

            {/* Navigation Arrows */}
            <div className="flex gap-2">
              <button
                onClick={() => scroll(registeredScrollRef, "left")}
                className="p-2 rounded-full hover:bg-white cursor-pointer text-gray-400 hover:text-gray-800 transition-colors"
              >
                <svg
                  className="w-6 h-6"
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
              </button>

              <button
                onClick={() => scroll(registeredScrollRef, "right")}
                className="p-2 rounded-full hover:bg-white cursor-pointer text-gray-800 transition-colors"
              >
                <svg
                  className="w-6 h-6"
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

          {/* Scroll Container */}
          <div
            ref={registeredScrollRef}
            className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scroll-smooth hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {upcomingEvents.map((event) => (
              <div key={event.id} className="snap-start shrink-0">
                <EventCard
                  variant="details"
                  {...event}
                  path={`/student/events/${event.id}`}
                />
              </div>
            ))}
          </div>

          {/* Dots (optional, visual consistency) */}
          <div className="flex justify-center gap-2 mt-2">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-600"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          </div>
        </section>
      </div>
      <div className="four px-6 bg-white">
        <RecommendedSection />
      </div>
      <div className="three p-6">
        <section className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between mb-6 bg-white-500">
            <h2 className="text-[24px] font-bold text-gray-900 tracking-wide">
              MY PAST EVENTS
            </h2>

            {/* Navigation Arrows */}
            <div className="flex gap-2">
              <button
                onClick={() => scroll(pastScrollRef, "left")}
                className="p-2 rounded-full hover:bg-white cursor-pointer text-gray-400 hover:text-gray-800 transition-colors"
              >
                <svg
                  className="w-6 h-6"
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
              </button>
              <button
                onClick={() => scroll(pastScrollRef, "right")}
                className="p-2 rounded-full hover:bg-white cursor-pointer text-gray-800 transition-colors"
              >
                <svg
                  className="w-6 h-6"
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

          <div
            ref={pastScrollRef}
            className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scroll-smooth hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {pastEvents.map((event) => (
              <EventCard
                key={event.id}
                {...event}
                path={`/student/events/${event.id}`}
              />
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-2">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-600 cursor-pointer"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer transition-colors"></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;
