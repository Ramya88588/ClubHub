import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebase";
import { getUserById } from "@/firebase/collections";

import ClubDashboard from "@/pages/club/ClubDashboard";
import CreateEventPage from "@/pages/club/CreateEventPage";
import EditEventPage from "@/pages/club/EditEventPage";
import EventDetailsPage from "@/pages/club/EventDetailsPage";
import DraftEventsPage from "@/pages/club/DraftEventsPage";
import Settings from "@/pages/club/Settings";
import NotFoundPage from "@/pages/public/NotFoundPage";
import Announcements from "@/pages/club/AnnouncementsPage";

const ClubRoutes = () => {
  // const [userDoc, setUserDoc] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const user = auth.currentUser;
  //     if (!user) {
  //       setLoading(false);
  //       return;
  //     }

  //     const data = await getUserById(user.uid);
  //     setUserDoc(data);
  //     setLoading(false);
  //   };

  //   fetchUser();
  // }, []);

  // // ⏳ Loading state
  // if (loading) {
  //   return (
  //     <div className="w-screen h-screen flex items-center justify-center">
  //       Loading club dashboard...
  //     </div>
  //   );
  // }

  // // ❌ No user doc or wrong role
  // if (!userDoc || userDoc.role !== "CLUB") {
  //   return <Navigate to="/login" replace />;
  // }

  // // ⏸ Club not approved
  // if (userDoc.isApproved === false) {
  //   return <Navigate to="/waiting-approval" replace />;
  // }

  // ✅ Approved club → allow routes
  return (
    <Routes>
      <Route index element={<ClubDashboard />} />
      <Route path="create-event" element={<CreateEventPage />} />
      <Route path="edit-event/:id" element={<EditEventPage />} />
      <Route path="draftEvents" element={<DraftEventsPage />} />
      <Route path="settings" element={<Settings />} />
       <Route path="announcements" element={<Announcements />} />
  
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default ClubRoutes;
