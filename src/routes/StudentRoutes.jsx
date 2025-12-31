import { Routes, Route } from "react-router-dom";

import DashboardLayout from "@/components/layout/DashboardS/DashboardLayout";
import StudentDashboard from "../pages/student/StudentDashboard";
import ClubInfo from "../pages/student/ClubInfo.jsx";
import EventPage from "../pages/student/EventsPage";
import ProfilePage from "../pages/student/ProfilePage";
import EventDetailsPage from "@/pages/student/EventDetailsPage";
import NotFoundPage from "@/pages/public/NotFoundPage";
import ProfPage from "@/pages/student/ProfPage";
import SettingsPage from "@/pages/student/SettingsPage";
import EventRegister from "@/pages/student/RegisterPage";

export default function StudentRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<StudentDashboard />} />

        <Route path="clubs" element={<ClubInfo/>} />
        <Route path="events" element={<EventPage />}>
        </Route>
        
      </Route>
       <Route path="events/:id" element={<EventDetailsPage/>}/>
       <Route path="profile" element={<ProfilePage />} />
       <Route path="profileP" element={<ProfPage />} />
       <Route path="settings" element={<SettingsPage />} />
      <Route path="/events/:eventId/register" element={<EventRegister />} />
       
       
       <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  );
}
