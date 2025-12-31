import React from 'react'
import bgImg from "@/assets/SignIn.png";
import { useNavigate } from "react-router-dom";
import { googleSignIn } from "../../firebase/auth";
import SignUpCard2 from '@/components/layout/Signup/SignUpCard2';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await googleSignIn();

      // 🆕 New user → go to signup flow
      if (result.isNewUser) {
        navigate("/signup");
        return;
      }

      // ✅ Existing users routing
      if (result.role === "ADMIN") {
        navigate("/admin");
      } 
      else if (result.role === "STUDENT") {
        navigate("/student");
      } 
      else if (result.role === "CLUB") {
        if (result.isApproved === true) {
          navigate("/club");
        } else {
          navigate("/waiting-approval");
        }
      } 
      else {
        // safety fallback
        navigate("/login");
      }

    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="relative w-screen h-screen">
    <div className="absolute inset-0 w-full h-full bg-cover" style={{backgroundImage:`url(${bgImg})`}}>
    <div className="absolute bg-black/20 inset-0"></div>
    <div className="relative z-10"><SignUpCard2 txt="in" onGoogleLogin={handleGoogleLogin} /></div>
    </div>
    </div>
  )
}

export default LoginPage

