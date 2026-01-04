import React from "react";
import FooterPage from "@/components/layout/landing/FooterPage";

const HandbookPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-semibold text-gray-900 mb-6">
          ClubHub Handbook
        </h1>

        <p className="text-gray-600 mb-10">
          A quick guide to help students and clubs use ClubHub effectively.
        </p>

        {/* What is ClubHub */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">What is ClubHub?</h2>
          <p className="text-gray-700 leading-relaxed">
            ClubHub is a unified platform that connects students, clubs, and
            campus events. It simplifies event discovery, registrations, club
            management, and engagement across the university.
          </p>
        </section>

        {/* For Students */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">For Students</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Discover clubs and events based on your interests</li>
            <li>Register for events in one click</li>
            <li>Track upcoming and past events</li>
            <li>Receive reminders and hiring notifications</li>
            <li>Give feedback after attending events</li>
          </ul>
        </section>

        {/* For Clubs */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">For Clubs</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Create and manage events</li>
            <li>Track registrations and engagement</li>
            <li>Recruit members through hiring posts</li>
            <li>View analytics and performance</li>
          </ul>
        </section>

        {/* Roles */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Account Roles</h2>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Role</th>
                  <th className="p-3">Access</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-3">Student</td>
                  <td className="p-3">Events, clubs, registrations</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">Club</td>
                  <td className="p-3">Event & member management</td>
                </tr>
                <tr className="border-t">
                  <td className="p-3">Admin</td>
                  <td className="p-3">Platform moderation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <FooterPage />
    </div>
  );
};

export default HandbookPage;
