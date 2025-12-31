import React from 'react'
import {Routes,Route} from "react-router-dom"
import ClubDashboard from "../pages/club/ClubDashboard"
import CreateEventPage from "../pages/club/CreateEventPage"
import EditEventPage from "../pages/club/EditEventPage"
import EventDetailsPage from '@/pages/club/EventDetailsPage'
import NotFoundPage from '@/pages/public/NotFoundPage'
import DraftEventsPage from '@/pages/club/DraftEventsPage'
import Settings from '@/pages/club/Settings'
import Announcements from '@/pages/club/AnnouncementsPage'
const ClubRoutes = () => {
  return (
    <div>
        <Routes>
      <Route path="/" element={<ClubDashboard />} />
      <Route path="create-event" element={<CreateEventPage />} />
      <Route path="edit-event/:id" element={<EventDetailsPage />} />
      <Route path="draftEvents" element={<DraftEventsPage />} />
      <Route path="settings" element={<Settings />} />
      <Route path="announcements" element={<Announcements />} />
    
      <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
  )
}

export default ClubRoutes
