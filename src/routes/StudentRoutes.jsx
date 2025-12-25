import { Routes, Route } from "react-router-dom";

import DashboardLayout from "@/components/layout/DashboardS/DashboardLayout";
import StudentDashboard from "../pages/student/StudentDashboard";
import ClubInfo from "../pages/student/ClubInfo.jsx";
import EventPage from "../pages/student/EventsPage";
import ProfilePage from "../pages/student/ProfilePage";
import EventDetailsPage from "@/pages/student/EventDetailsPage";

export default function StudentRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<StudentDashboard />} />

        <Route path="clubs" element={<ClubInfo/>} />
        <Route path="events" element={<EventPage />}>
        </Route>
        <Route path="profile" element={<ProfilePage />} />
      </Route>
       <Route path="events/:id" element={<EventDetailsPage/>}/>
    </Routes>
  );
}
