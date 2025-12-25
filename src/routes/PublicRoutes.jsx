import React from 'react'
import {Routes,Route} from "react-router-dom"

import LoginPage from '../pages/public/LoginPage'
import LandingPage from '../pages/public/LandingPage'
import SignupPage from '../pages/public/SignupPage1'
import SingupPage2 from '@/pages/public/SignupPage2'
const PublicRoutes = () => {
  return (
    <div>
      <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="/" element={<LandingPage/>} />
      <Route path="signup1" element={<SignupPage />} />
      <Route path="signup2" element={<SingupPage2 />} />
      <Route path="auth" element={<h1>Google Auth Page</h1>} />
      </Routes>
    </div>
  )
}

export default PublicRoutes;
