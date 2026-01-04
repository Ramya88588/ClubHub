import React from "react";
import FooterPage from "@/components/layout/landing/FooterPage";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-semibold mb-6">Terms of Service</h1>

        <section className="space-y-6 text-gray-700">
          <p>
            By using ClubHub, you agree to follow these terms and use the
            platform responsibly.
          </p>

          <div>
            <h3 className="font-semibold text-lg">User Responsibilities</h3>
            <ul className="list-disc pl-6">
              <li>Provide accurate information</li>
              <li>Respect other users</li>
              <li>Do not misuse platform features</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Prohibited Actions</h3>
            <ul className="list-disc pl-6">
              <li>Fake clubs or events</li>
              <li>Harassment or abuse</li>
              <li>Unauthorized data usage</li>
            </ul>
          </div>

          <p>
            ClubHub reserves the right to suspend or terminate accounts that
            violate these terms.
          </p>
        </section>
      </main>

      <FooterPage />
    </div>
  );
};

export default TermsPage;
