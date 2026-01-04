import React from "react";
import FooterPage from "@/components/layout/landing/FooterPage";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-semibold mb-6">Privacy Policy</h1>

        <section className="space-y-6 text-gray-700">
          <p>
            Your privacy matters to us. This page explains how we handle your
            data.
          </p>

          <div>
            <h3 className="font-semibold text-lg">Information We Collect</h3>
            <ul className="list-disc pl-6">
              <li>Name and email</li>
              <li>Role (student / club)</li>
              <li>Event registrations and preferences</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg">How We Use Data</h3>
            <ul className="list-disc pl-6">
              <li>Personalized recommendations</li>
              <li>Event communication</li>
              <li>Platform improvement</li>
            </ul>
          </div>

          <p>We do not sell your data or show third-party advertisements.</p>
        </section>
      </main>

      <FooterPage />
    </div>
  );
};

export default PrivacyPage;
