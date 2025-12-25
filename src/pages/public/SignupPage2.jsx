import React from 'react'
import bgImg from "@/assets/SignIn.png";
import SingUpCard2 from '@/components/layout/Singup/SingUpCard2';
import { Link } from 'react-router-dom';

const SignupPage2 = () => {
  return (
    <div className="relative w-screen h-screen">
    <div className="absolute inset-0 w-full h-full bg-cover" style={{backgroundImage:`url(${bgImg})`}}>
    <div className="absolute bg-black/20 inset-0"></div>
    <div className="relative z-10"><SingUpCard2 txt="up">
        <p className="text-center font-light">
            Already have an account ?
            <Link to="/login" className="text-blue-500"> {" "}Login</Link>
          </p>
    </SingUpCard2>
   </div>
    </div>
    </div>
  )
}

export default SignupPage2

