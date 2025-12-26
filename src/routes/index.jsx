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
     
      <Route path="/*" element={<PublicRoutes />} />
      

      <Route
        path="/student/*"
        element={
          <PrivateRoute>
            <StudentRoutes />
          </PrivateRoute>
        }
      />

      <Route
        path="/club/*"
        element={
          <PrivateRoute>
            <ClubRoutes />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/*"
        element={
          <PrivateRoute>
            <AdminRoutes />
          </PrivateRoute>
        }
      />
     
    </Routes>
  );
}
