import { Routes, Route } from "react-router-dom";

import PublicRoutes from "./PublicRoutes";
import StudentRoutes from "./StudentRoutes";
import ClubRoutes from "./ClubRoutes";
import AdminRoutes from "./AdminRoutes";
import PrivateRoute from "./PrivateRoute";
import NotFoundPage from "@/pages/public/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/*" element={<PublicRoutes />} />

      {/* Student */}
      <Route
        path="/student/*"
        element={
          <PrivateRoute>
            <StudentRoutes />
          </PrivateRoute>
        }
      />

      {/* Club */}
      <Route
        path="/club/*"
        element={
          <PrivateRoute>
            <ClubRoutes />
          </PrivateRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute>
            <AdminRoutes />
          </PrivateRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

