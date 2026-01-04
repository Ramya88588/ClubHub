import React from "react";
import FooterPage from "@/components/layout/landing/FooterPage";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-semibold text-gray-900 mb-6">
          Contact Us
        </h1>

        <p className="text-gray-600 mb-10">
          Have questions or need help? Reach out to us.
        </p>

        <div className="bg-white border rounded-xl p-8 space-y-4">
          <p className="text-gray-700">
            📧 Email:{" "}
            <span className="font-medium">clubhub.support@vitap.ac.in</span>
          </p>
          <p className="text-gray-700">🏫 Campus: VIT-AP University</p>
          <p className="text-gray-700">⏱ Response time: Within 24–48 hours</p>
        </div>
      </main>

      <FooterPage />
    </div>
  );
};

export default ContactPage;
