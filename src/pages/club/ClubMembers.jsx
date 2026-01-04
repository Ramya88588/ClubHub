import { useState } from "react";
import Navbar from "@/components/layout/DashboardC/Navbar";

const MOCK_MEMBERS = [
  {
    id: "1",
    name: "J Jayakumar",
    email: "jj@electronicapmd.com",
    role: "Member",
    joinedAt: "12 Dec 2025",
  },
  {
    id: "2",
    name: "Ruvanthika",
    email: "ruva@college.edu",
    role: "President",
    joinedAt: "01 Jan 2025",
  },
  {
    id: "3",
    name: "Ananya Sharma",
    email: "ananya@college.edu",
    role: "Core Team",
    joinedAt: "20 Feb 2025",
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
    <Navbar/>
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
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-500"
                  >
                    No members found
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="border-t hover:bg-gray-50"
                  >
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
    </div>
  );
};

export default ClubMembers;
