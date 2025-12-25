import Navbar from "@/components/layout/DashboardC/Navbar";
import React from "react";
import { Plus } from "lucide-react";
import { BarChart3, Users, Send } from "lucide-react";
import ClubEventCard from "@/components/shared/clubEventCard";
import EventCard from "@/components/shared/eventCard";
import FooterPage from "@/components/layout/landing/FooterPage";
import { Link } from "react-router-dom";
// data/mockEvents.js
// data/pastEvents.js
export const pastEvents = [
  {
    id: 1,
    title: "TechSprint Hackathon",
    description: "24-hour hackathon focused on real-world problem solving.",
    date: "12/03/2025",
    type: "Technical",
    theme: "green",
    image: "",
    showAnalytics: true,
  },
  {
    id: 2,
    title: "UI/UX Workshop",
    description: "Hands-on workshop on UI/UX fundamentals.",
    date: "22/02/2025",
    type: "Workshop",
    theme: "red",
    image: "",
    showAnalytics: true,
  },
  {
    id: 3,
    title: "Coding Contest",
    description: "Competitive coding event for all branches.",
    date: "05/01/2025",
    type: "Competition",
    theme: "yellow",
    image: "",
    showAnalytics: true,
  },
];

export const mockEvents = [
  {
    id: 1,
    title: "TechSprint Hackathon",
    description: "A 24-hour hackathon to build innovative tech solutions.",
    date: "12/04/2025",
    type: "Technical",
    theme: "yellow",
    image: "",
    registeredMembers:100,
  },
  {
    id: 2,
    title: "UI/UX Design Workshop",
    description: "Hands-on workshop on modern UI/UX practices.",
    date: "18/04/2025",
    type: "Workshop",
    theme: "blue",
    image: "",
    registeredMembers:100
  },
  {
    id: 3,
    title: "Coding Contest",
    description: "Competitive programming contest for all years.",
    date: "25/04/2025",
    type: "Competition",
    theme: "yellow",
    image: "",
    registeredMembers:100,
  },
  {
    id: 4,
    title: "AI & ML Bootcamp",
    description: "Introduction to Machine Learning and AI concepts.",
    date: "02/05/2025",
    type: "Bootcamp",
    theme: "blue",
    image: "",
    registeredMembers:100,
  },
];

const ClubDashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-19 bg-[#f8f9fa] p-16">
        <div className="">
          <p className="font-semibold text-[32px]">
            <span className="text-green-500 font-semibold text-[32px]">
              Coding Club
            </span>
            Dashboard
          </p>
          <p>Manage your events and check your club performance</p>
        </div>
        <div className="flex gap-4 mt-10">
          <div className="one  border-2 border-[#d9d9d9] shadow-sm rounded-2xl pt-5 pl-5 w-[30%]  bg-white">
            <p className="font-medium text-[24px]">Club Info</p>
            <div className="font-light p-3">
              <p>Name: Coding Club</p>
              <p>President: Sarah</p>
              <p>Members: 35</p>
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
          <p className="text-[36px]">2</p>
          <span className="font-light">Upcoming Events</span>
        </div>
        <div className="eA text-green-500 flex flex-col items-center">
          <p className="text-[36px]">3</p>
          <span className="font-light"> Events Attended</span>
        </div>
        <div className="cH text-yellow-500 flex flex-col items-center">
          <p className="text-[36px]">3</p>
          <span className="font-light">Club Hiring</span>
        </div>
      </div>
      <div className="p-16 bg-[#f8f9fa] flex gap-8 flex-col">
        <span className="text-xl font-semibold ">MY CLUB'S EVENTS</span>
        <div className="flex flex-wrap gap-10">
          {mockEvents.length > 0 ? (
            mockEvents.map((event) => (
              <ClubEventCard
                key={event.id}
                id={event.id}
                title={event.title}
                description={event.description}
                date={event.date}
                type={event.type}
                theme="yellow"
                image={event.img}
                registeredMembers={event.registeredMembers}
              />
            ))
          ) : (
            <h1>No Club Events</h1>
          )}
        </div>
      </div>
      <div className="bg-white p-16 flex flex-col gap-8">
        <span
          className="font-semibold
        "
        >
          MY PAST EVENTS
        </span>
        <div className="flex gap-10 flex-wrap">
          {pastEvents.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              description={event.description}
              date={event.date}
              type={event.type}
              theme={event.theme}
              image={event.image}
              showAnalytics={event.showAnalytics}
            />
          ))}
        </div>
      </div>
      <div className="flex p-16 bg-[#f8f9fa] justify-between">
        <div>
          <p className="text-[32px]">Is your club hiring members?</p>
          <p className="text-[24px] font-light">Yes? Then post your status in the clubs page to find new talented members</p>
        </div>
        <div className="bg-yellow-500 text-white rounded-2xl flex items-center px-4 text-[24px]">
          <p>Update your club status</p>
        </div>
    
      </div>
       <FooterPage/>
    </div>
  );
};

export default ClubDashboard;
