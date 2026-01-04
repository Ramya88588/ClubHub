import { useState } from "react";
import Navbar from "@/components/layout/DashboardC/Navbar";
import FooterPage from "@/components/layout/landing/FooterPage";

const MOCK_MEMBERS = [
  {
    id: "2",
    name: "Ruvanthika",
    email: "ruva@college.edu",
    role: "President",
    joinedAt: "01 Jan 2025",
  },
  {
    id: "10",
    name: "Arjun Mehta",
    email: "arjun@college.edu",
    role: "Vice President",
    joinedAt: "22 May 2025",
  },
  {
    id: "8",
    name: "Karthik Srinivas",
    email: "karthik@college.edu",
    role: "Treasurer",
    joinedAt: "28 Apr 2025",
  },
  {
    id: "3",
    name: "Ananya Sharma",
    email: "ananya@college.edu",
    role: "Core Team",
    joinedAt: "20 Feb 2025",
  },
  {
    id: "5",
    name: "Bhavya Reddy",
    email: "bhavya@college.edu",
    role: "Core Team",
    joinedAt: "18 Mar 2025",
  },
  {
    id: "1",
    name: "J Jayakumar",
    email: "jj@electronicapmd.com",
    role: "Member",
    joinedAt: "12 Dec 2025",
  },
  {
    id: "4",
    name: "Roshan",
    email: "roshan@vitap.ac.in",
    role: "Member",
    joinedAt: "05 Mar 2025",
  },
  {
    id: "6",
    name: "Siddharth Verma",
    email: "siddharth@college.edu",
    role: "Member",
    joinedAt: "02 Apr 2025",
  },
  {
    id: "7",
    name: "Aishwarya Nair",
    email: "aishwarya@college.edu",
    role: "Member",
    joinedAt: "15 Apr 2025",
  },
  {
    id: "9",
    name: "Neha Gupta",
    email: "neha@college.edu",
    role: "Member",
    joinedAt: "10 May 2025",
  },
];

const ClubMembers = () => {
  const [query, setQuery] = useState("");

  const filteredMembers = MOCK_MEMBERS.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="mt-15 p-16 bg-[#f8f9fa] min-h-screen">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Club Members
            </h1>
            <p className="text-sm text-gray-500">
              Manage and view all members of your club
            </p>
          </div>

          {/* Search */}
          <div className="bg-white p-4 rounded-xl border">
            <input
              type="text"
              placeholder="Search members by name or email"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left px-6 py-3 font-medium">Name</th>
                  <th className="text-left px-6 py-3 font-medium">Email</th>
                  <th className="text-left px-6 py-3 font-medium">Role</th>
                  <th className="text-left px-6 py-3 font-medium">Joined</th>
                </tr>
              </thead>

              <tbody>
                {filteredMembers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-500">
                      No members found
                    </td>
                  </tr>
                ) : (
                  filteredMembers.map((member) => (
                    <tr key={member.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {member.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {member.email}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs bg-blue-50 text-blue-600">
                          {member.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {member.joinedAt}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default ClubMembers;
