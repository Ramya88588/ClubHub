import Navbar from "@/components/layout/DashboardC/Navbar";
import React from "react";
import { Plus } from "lucide-react";
import { BarChart3, Users, Send } from "lucide-react";
import ClubEventCard from "@/components/shared/clubEventCard";
import EventCard from "@/components/shared/eventCard";
import FooterPage from "@/components/layout/landing/FooterPage";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getClubUpcomingEvents,
  getClubPastEvents,
  getUserById,
  getClubById,
} from "@/firebase/collections";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import Loader from "@/components/shared/Loader";

// data/mockEvents.js
// data/pastEvents.js
// export const pastEvents = [
//   {
//     id: 1,
//     title: "TechSprint Hackathon",
//     description: "24-hour hackathon focused on real-world problem solving.",
//     date: "12/03/2025",
//     type: "Technical",
//     theme: "green",
//     image: "",
//     showAnalytics: true,
//   },
//   {
//     id: 2,
//     title: "UI/UX Workshop",
//     description: "Hands-on workshop on UI/UX fundamentals.",
//     date: "22/02/2025",
//     type: "Workshop",
//     theme: "red",
//     image: "",
//     showAnalytics: true,
//   },
//   {
//     id: 3,
//     title: "Coding Contest",
//     description: "Competitive coding event for all branches.",
//     date: "05/01/2025",
//     type: "Competition",
//     theme: "yellow",
//     image: "",
//     showAnalytics: true,
//   },
// ];

// export const mockEvents = [
//   {
//     id: 1,
//     title: "TechSprint Hackathon",
//     description: "A 24-hour hackathon to build innovative tech solutions.",
//     date: "12/04/2025",
//     type: "Technical",
//     theme: "yellow",
//     image: "",
//     registeredMembers:100,
//   },
//   {
//     id: 2,
//     title: "UI/UX Design Workshop",
//     description: "Hands-on workshop on modern UI/UX practices.",
//     date: "18/04/2025",
//     type: "Workshop",
//     theme: "blue",
//     image: "",
//     registeredMembers:100
//   },
//   {
//     id: 3,
//     title: "Coding Contest",
//     description: "Competitive programming contest for all years.",
//     date: "25/04/2025",
//     type: "Competition",
//     theme: "yellow",
//     image: "",
//     registeredMembers:100,
//   },
//   {
//     id: 4,
//     title: "AI & ML Bootcamp",
//     description: "Introduction to Machine Learning and AI concepts.",
//     date: "02/05/2025",
//     type: "Bootcamp",
//     theme: "blue",
//     image: "",
//     registeredMembers:100,
//   },
// ];

const ClubDashboard = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [club, setClub] = useState(null);
  const navigate = useNavigate();

  // TEMP (replace later with real club auth)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const userDoc = await getUserById(user.uid);

      if (userDoc?.role !== "CLUB") {
        console.error("Not a club account");
        return;
      }

      // fetch club profile
      const clubData = await getClubById(user.uid);
      setClub(clubData);

      // ✅ USE AUTH UID AS CLUB ID
      const [upcoming, past] = await Promise.all([
        getClubUpcomingEvents(user.uid),
        getClubPastEvents(user.uid),
      ]);

      setUpcomingEvents(upcoming);
      setPastEvents(past);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Loader
        message="Loading your dashboard…"
        subMessage="Fetching events and club data"
        variant="skeleton"
      />
    );
  }

  return (
    <div className="overflow-y-scroll  no-scrollbar h-screen">
      <Navbar />
      <div className="bg-[#f8f9fa] px-8 py-10 mt-15">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* TOP ROW: TITLE + PRIMARY ACTION */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">
                <span className="text-green-500">
                  {club?.clubName || "Club"}
                </span>{" "}
                Dashboard
              </h1>
              <p className="text-gray-500 mt-1">
                Manage events, members, and announcements for your club
              </p>
            </div>

            {/* PRIMARY CTA */}
            <Link
              to="/club/create-event"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-gray-300 border-2 text-black rounded-lg font-medium hover:border-green-500 transition w-fit"
            >
              <Plus size={30} className="text-green-500"></Plus>
              Create Event
            </Link>
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-white border rounded-md p-6">
            <div className="flex flex-col md:flex-row gap-6 justify-around">
              <button
                onClick={() => navigate("/club/analytics")}
                className="flex items-center gap-3 text-gray-700 hover:text-yellow-600 cursor-pointer transition"
              >
                <BarChart3 className="w-6 h-6" />
                <span className="font-medium">View Analytics</span>
              </button>

              <button
                onClick={() => navigate("/club/members")}
                className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer transition"
              >
                <Users className="w-6 h-6" />
                <span className="font-medium">Manage Members</span>
              </button>

              <button
                onClick={() => navigate("/club/announcements")}
                className="flex items-center gap-3 text-gray-700 hover:text-red-600 cursor-pointer transition"
              >
                <Send className="w-6 h-6" />
                <span className="font-medium">Send Announcement</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="two flex justify-evenly py-8 bg-white">
        <div className="uP text-blue-500 flex flex-col items-center">
          <p className="text-[36px]">{upcomingEvents.length}</p>
          <span className="font-light">Upcoming Events</span>
        </div>
        <div className="eA text-green-500 flex flex-col items-center">
          <p className="text-[36px]">{pastEvents.length}</p>
          <span className="font-light"> Events Conducted</span>
        </div>
        <div className="cH text-yellow-500 flex flex-col items-center">
          <p className="text-[36px]">3</p>
          <span className="font-light">Club Hiring</span>
        </div>
      </div>
      <div className="p-16 bg-[#f8f9fa] flex gap-8 flex-col">
        <span className="text-xl font-semibold ">MY CLUB'S EVENTS</span>
        <div className="flex flex-wrap gap-10">
          {upcomingEvents.length === 0 ? (
            <h1>No Upcoming Events</h1>
          ) : (
            upcomingEvents.map((event) => (
              <ClubEventCard
                key={event.id}
                id={event.id}
                title={event.title}
                description={event.description}
                date={event.date}
                type={event.type}
                theme={event.theme}
                image={event.image}
                registeredMembers={event.registeredUsers?.length || 0}
              />
            ))
          )}
        </div>
      </div>
      {/* Past Events */}
      <div className="bg-white p-16 flex flex-col gap-8">
        <span className="font-semibold text-xl">MY PAST EVENTS</span>
        <div className="flex gap-10 flex-wrap">
          {pastEvents.length === 0 ? (
            <p>No past events</p>
          ) : (
            pastEvents.map((event) => (
              <EventCard key={event.id} {...event} showAnalytics />
            ))
          )}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row p-25 bg-[#f8f9fa] gap-5 justify-between">
        <div className="text-center lg:text-left">
          <p className="text-xl ">Is your club hiring members?</p>
          <p className="text-md font-light">
            Yes? Then post your status in the clubs page to find new talented
            members
          </p>
        </div>
        <div
          className="bg-yellow-500 text-white rounded-lg h-fit flex items-center justify-center px-10 py-2 cursor-pointer"
          onClick={() => navigate("/club/settings")}
        >
          <p>Update your club status</p>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default ClubDashboard;
