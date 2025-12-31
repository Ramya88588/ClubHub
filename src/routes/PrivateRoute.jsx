// // import { Navigate } from "react-router-dom";

// // const isAuthenticated = () => {
// //   return localStorage.getItem("isLoggedIn") === "true";
// // };

// // export default function PrivateRoute({ children }) {
// //   if (!isAuthenticated()) {
// //     return <Navigate to="/login" replace />;
// //   }

// //   return children;
// // }
// import React from 'react'

// const PrivateRoute = ({children}) => {
//   return (
//     children
//   )
// }

// export default PrivateRoute

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!firebaseUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
