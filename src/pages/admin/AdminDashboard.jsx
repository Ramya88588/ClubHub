import StatsCard from "./StatsCard";
import RequestsTable from "./RequestsTable";
import { useState, useEffect } from "react";
import { getPendingClubRequests } from "@/firebase/collections";
import {doc, updateDoc} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { createClub } from "@/firebase/collections";
import { auth } from "@/firebase/firebase";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getPendingClubRequests();
        setRequests(data);
      } catch (err) {
        console.error("Failed to fetch requests", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (req) => {
    
    try {
      // 1️⃣ mark request approved
      await updateDoc(doc(db, "clubRequests", req.id), {
        status: "APPROVED",
        updatedAt: new Date(),
      });

      // 2️⃣ create club
      await createClub(req.uid, {
        clubName: req.clubName,
        presidentName: req.presidentName,
        email: req.email,
        isActive: true
      });

      // 3️⃣ approve user
      await updateDoc(doc(db, "users", req.uid), {
        isApproved: true,
      });

      // 4️⃣ remove from UI
      setRequests((prev) => prev.filter((r) => r.id !== req.id));
    } catch (err) {
      console.error("Approve failed", err);
      alert("Failed to approve club");
    }
  };


  const handleReject = async (id) => {
    try {
      await updateDoc(doc(db, "clubRequests", id), {
        status: "REJECTED",
      });

      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Reject failed", err);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center px-8 py-4 bg-white border-b">
        <div className="flex items-center gap-2 font-semibold">
          <span className="text-blue-600">College Club</span>
        </div>

        <div className="flex gap-6 items-center text-sm">
          <button>View Users</button>
          <button>View Clubs</button>
          <button className="border px-4 py-1 rounded text-red-500">
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <h1 className="text-3xl font-semibold">Admin Panel</h1>
        <p className="text-gray-500 mt-1">
          Review and manage students clubs in college
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <StatsCard title="Total Students" />
          <StatsCard title="Total Clubs" />
          <StatsCard title="Pending Requests" />
          <StatsCard title="Total Events" />
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mt-10">
          <button className="px-6 py-2 bg-yellow-400 rounded text-white">
            Pending Requests
          </button>
          <button className="px-6 py-2 bg-gray-100 rounded text-gray-500">
            Approved Clubs
          </button>
        </div>

        {/* Filters */}
        <div className="flex justify-end gap-4 mt-4">
          <button className="border px-4 py-2 rounded">Filter</button>
          <button className="border px-4 py-2 rounded">Sort</button>
        </div>

        {/* Table */}
        {loading ? (
          <p className="mt-6">Loading requests...</p>
        ) : (
          <RequestsTable
            data={requests}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
