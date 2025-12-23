
import React from "react";

import { Link } from "react-router-dom";

const SingUpCard2 = ({txt,onGoogleLogin,children}) => {
  return (
    <div className="min-h-screen flex items-center justify-center min-w-screen">
      <div className="card w-176 h-100 bg-base-100 card-xl shadow-sm flex items-center justify-center gap-6">
        <h2 className="card-title text-[24px] justify-center">
          {" "}
          <svg
            width="38"
            height="34"
            viewBox="0 0 36 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 2.66666L3 9.33332L18 16L33 9.33332L18 2.66666Z"
              fill="#4285F4"
            />
            <path
              d="M3 18.6667L18 25.3333L33 18.6667"
              stroke="#34A853"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 13.3333L18 20L33 13.3333"
              stroke="#FBBC05"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 22L18 28.6667L33 22"
              stroke="#EA4335"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          ClubHub
        </h2>
        <div className="mx-auto flex flex-col gap-3">
          <p className="font-extralight text-center text-[32px]">Sign {txt} to continue</p>
          {onGoogleLogin && (
            <div className="mx-auto">
              <button
                onClick={onGoogleLogin}
                className="btn btn-primary rounded-2xl px-10"
              >
                Sign {txt} with Google
              </button>
            </div>
          )}
          <p className="font-light mt-3">
            By signing in, you agree to our{" "}
            <span className="text-blue-500">Terms </span>and{" "}
            <span className="text-blue-500">Privacy Policy</span>
          </p>
         {children}
        </div>
      </div>
    </div>
  );
};

export default SingUpCard2;
