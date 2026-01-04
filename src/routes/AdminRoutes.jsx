import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { getUserById } from "@/firebase/collections";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminApprove from "@/pages/admin/AdminApprove";
import ClubManagementPage from "@/pages/admin/ClubManagementPage";
import Loader from "@/components/shared/Loader";

const AdminRoutes = () => {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getUserById(user.uid);

        // ✅ Role-based check (consistent everywhere)
        if (userDoc?.role === "ADMIN") {
          setAllowed(true);
        } else {
          console.error("Access denied: not an admin account");
          alert("This dashboard is only available for Admin accounts.");
          navigate(-1);
        }
      } catch (err) {
        console.error("Admin access check failed:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, [navigate]);

  if (loading) {
    return <Loader message="Checking permissions..." />;
  }

  // if (!allowed) {
  //   return <Navigate to="/" replace />;
  // }

  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/approve" element={<AdminApprove />} />
      <Route path="/clubs" element={<ClubManagementPage />} />
    </Routes>
  );
};

export default AdminRoutes;
