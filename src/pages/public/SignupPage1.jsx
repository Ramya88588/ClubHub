import React from 'react'
import bgImg from "@/assets/SignIn.png";
import SignUpCard1 from '@/components/layout/Signup/SignUpCard1';

const SignupPage1 = () => {
  return (
    <div className="relative w-screen h-screen">
    <div className="absolute inset-0 w-full h-full bg-cover" style={{backgroundImage:`url(${bgImg})`}}>
    <div className="absolute bg-black/20 inset-0"></div>
    <div className="relative z-10"><SignUpCard1/></div>
    </div>
    </div>
  )
}

export default SignupPage1
