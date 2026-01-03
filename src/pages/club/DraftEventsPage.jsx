import Navbar from "@/components/layout/DashboardC/Navbar";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

const DraftEventsPage = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-15 bg-[#f8f9fa] p-16">
        <div className="flex justify-between">
          <div className="">
            <p className="font-semibold text-[32px]">
              <span className="text-green-500 font-semibold text-[32px]"></span>
              Draft Events
            </p>
            <p>
              Manage your unpublished events and continue where you left off
            </p>
          </div>
          <Link to="/club/create-event">
            <div className="border shadow-sm flex items-center gap-4 py-4 rounded-md px-10 bg-white">
              <Plus size={40} className="text-green-500"></Plus>
              <p>Create New Event</p>
            </div>
          </Link>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default DraftEventsPage;
