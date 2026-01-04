import React from 'react'
import bgImg from "@/assets/SignIn.png";
import SignUpCard2 from '@/components/layout/Signup/SignUpCard2';
import { Link } from 'react-router-dom';

const SignupPage2 = () => {
  return (
    <div className="relative w-screen h-screen bg-[#f8f9fa]">
    <div className="relative z-10"><SignUpCard2 txt="up">
        <p className="text-center font-light">
            Already have an account ?
            <Link to="/login" className="text-blue-500"> {" "}Login</Link>
          </p>
    </SignUpCard2>
   </div>
    </div>
  )
}

export default SignupPage2

