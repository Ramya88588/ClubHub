import React from "react";
import { Link } from "react-router-dom";

const FooterPage = () => {
  return (
    <div className="bg-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-12 sm:py-16 grid grid-cols-1  md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-2 space-y-4 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <svg width="36" height="32" viewBox="0 0 36 32" fill="none">
              <path
                d="M18 2.66666L3 9.33332L18 16L33 9.33332L18 2.66666Z"
                fill="#4285F4"
              />
              <path
                d="M3 18.6667L18 25.3333L33 18.6667"
                stroke="#34A853"
                strokeWidth="2"
              />
              <path
                d="M3 13.3333L18 20L33 13.3333"
                stroke="#FBBC05"
                strokeWidth="2"
              />
              <path
                d="M3 22L18 28.6667L33 22"
                stroke="#EA4335"
                strokeWidth="2"
              />
            </svg>
            <span className="text-lg font-semibold text-gray-900">ClubHub</span>
          </div>

          <p className="text-sm text-gray-600 max-w-sm mx-auto md:mx-0">
            Empowering student communities to connect, grow, and lead together
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-row gap-30 md:gap-50 w-md md:w-xl justify-center">
          {/* Platform */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link to="/student" className="hover:text-gray-900">
                  For Students
                </Link>
              </li>
              <li>
                <Link to="/club" className="hover:text-gray-900">
                  For Clubs
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-gray-900">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link to="/handbook" className="hover:text-gray-900">
                  Handbook
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-gray-900">
                  Help
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 gap-2">
          <span>© 2025 ClubHub Platform</span>

          <div className="flex gap-10">
            <Link to="/privacy" className="hover:text-gray-900">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-gray-900">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterPage;
