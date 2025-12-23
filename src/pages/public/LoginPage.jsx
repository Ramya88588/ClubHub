import React from 'react'
import bgImg from "@/assets/SignIn.png";
import { useNavigate } from "react-router-dom";
import { googleSignIn } from "../../firebase/auth";
import SingUpCard2 from '@/components/layout/Singup/SingUpCard2';


const LoginPage = () => {
  const navigate = useNavigate();
  const handleGoogleLogin = async () =>{
    try{
      const user = await googleSignIn();
      navigate(`/${user.role}`); // student / club / admin

    }catch(err){
      console.error("Login failed : " ,err);
    }
  }
  return (
    <div className="relative w-screen h-screen">
    <div className="absolute inset-0 w-full h-full bg-cover" style={{backgroundImage:`url(${bgImg})`}}>
    <div className="absolute bg-black/20 inset-0"></div>
    <div className="relative z-10"><SingUpCard2 txt="in" onGoogleLogin={handleGoogleLogin} /></div>
    </div>
    </div>
  )
}

export default LoginPage

