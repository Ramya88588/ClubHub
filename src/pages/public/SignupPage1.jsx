import React from 'react'
import bgImg from "@/assets/SignIn.png";
import SingUpCard from '@/components/layout/Singup/SingUpCard1';

const SignupPage1 = () => {
  return (
    <div className="relative w-screen h-screen">
    <div className="absolute inset-0 w-full h-full bg-cover" style={{backgroundImage:`url(${bgImg})`}}>
    <div className="absolute bg-black/20 inset-0"></div>
    <div className="relative z-10"><SingUpCard/></div>
    </div>
    </div>
  )
}

export default SignupPage1
