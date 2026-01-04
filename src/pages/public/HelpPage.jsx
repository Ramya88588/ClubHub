import React from "react";
import FooterPage from "@/components/layout/landing/FooterPage";

const HelpPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-semibold text-gray-900 mb-6">Help</h1>

        <p className="text-gray-600 mb-10">
          Answers to common questions about using ClubHub.
        </p>

        <section className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg">
              I signed in but got redirected again
            </h3>
            <p className="text-gray-700">
              This usually happens when your account exists in authentication
              but not in the database. Please complete the signup process again.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              Can I change my role later?
            </h3>
            <p className="text-gray-700">
              No. Roles are fixed after signup. Contact support if you selected
              the wrong role.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              Why don’t I see recommended events?
            </h3>
            <p className="text-gray-700">
              Add your interests in Settings to receive personalized
              recommendations.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              Why is my club not visible?
            </h3>
            <p className="text-gray-700">
              Club accounts require admin approval before becoming public.
            </p>
          </div>
        </section>
      </main>

      <FooterPage />
    </div>
  );
};

export default HelpPage;
