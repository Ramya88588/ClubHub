import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { getUserById } from "@/firebase/collections";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminApprove from "@/pages/admin/AdminApprove";
import ClubManagementPage from "@/pages/admin/ClubManagementPage";

const AdminRoutes = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const userDoc = await getUserById(user.uid);

      // ✅ CORRECT CHECK
      if (userDoc?.isAdmin === true) {
        setIsAdmin(true);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) return null;

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/approve" element={<AdminApprove />} />
      <Route path="/clubs" element={<ClubManagementPage />} />
    </Routes>
  );
};

export default AdminRoutes;
