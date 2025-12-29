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
  getClubById
} from "@/firebase/collections";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";

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
  const [club,setClub] = useState(null);
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
    return <div className="p-10">Loading dashboard...</div>;
  }
  
  return (

    <div className="overflow-y-scroll no-scrollbar h-screen">
      <Navbar />
      <div className="mt-19 bg-[#f8f9fa] p-16">
        <div className="">
          <p className="font-semibold text-[32px]">
            <span className="text-green-500 font-semibold text-[32px]">
              {club?.clubName || "Club"}
            </span>
             Dashboard
          </p>
          <p>Manage your events and check your club performance</p>
        </div>
        <div className="flex gap-4 mt-10">
          <div className="one  border-2 border-[#d9d9d9] shadow-sm rounded-2xl pt-5 pl-5 w-[30%]  bg-white">
            <p className="font-medium text-[24px]">Club Info</p>
            <div className="font-light p-3">
              {!club ? (
                <p className="text-gray-400">Loading club info...</p>
              ) : (
                <>
                  <p>Name: {club.clubName}</p>
                  <p>President: {club.presidentName}</p>
                  <p>Members: {club.membersCount ?? 0}</p>
                </>
              )}
            </div>

          </div>
          <Link to="/club/create-event" className="w-[25%]">
          <div className="two border border-[#d9d9d9] shadow-sm rounded-2xl p-8 w-full  bg-white flex flex-col items-center">
            <Plus className="text-green-500 h-20 w-20" />
            <span className="font-light ">Create New Event</span>
          </div>
          </Link>
          <div className="three border-2 border-[#d9d9d9] shadow-sm rounded-2xl w-[30%]  justify-center bg-white flex flex-col font-light">
            <div className="flex items-center gap-3 p-2 border-b">
              {" "}
              <BarChart3 className="w-8 text-yellow-500" />
              View Analytics
            </div>
            <div className="flex items-center p-2 gap-2 border-b">
              <Users className="w-8 text-blue-500" />
              Manage Members
            </div>
            <div className="flex items-center p-2  gap-2 ">
              <Send className="w-8  text-red-500" />
              Send Announcement
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
      <div className="flex p-16 bg-[#f8f9fa] justify-between">
        <div>
          <p className="text-2xl">Is your club hiring members?</p>
          <p className="text-xl font-light">Yes? Then post your status in the clubs page to find new talented members</p>
        </div>
        <div className="bg-yellow-500 text-white rounded-2xl flex items-center px-4 cursor-pointer"  onClick={() =>navigate("/club/settings")}>
          <p>Update your club status</p>
        </div>
    
      </div>
       <FooterPage/>
    </div>
  );
};

export default ClubDashboard;
