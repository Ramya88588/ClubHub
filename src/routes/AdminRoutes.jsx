import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import { auth } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import { getUserById } from "@/firebase/collections";
import Loader from "@/components/shared/Loader";

const AdminRoutes = () => {
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;
      if (!user) {
        setAllowed(false);
        return;
      }

      const userDoc = await getUserById(user.uid);

      // 🔐 ONLY ADMINS
      setAllowed(userDoc?.role === "ADMIN");
    };

    checkAdmin();
  }, []);

  if (allowed === null) {
    return <Loader message="Checking Permissions..." />;
  }

  if (!allowed) {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      <Route index element={<AdminDashboard />} />
      {/* future admin routes */}
      {/* <Route path="users" element={<AdminUsers />} /> */}
    </Routes>
  );
};

export default AdminRoutes;
