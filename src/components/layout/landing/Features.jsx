import React from 'react'
import CardNoImg from '../../shared/cardNoImg'
import { IoCompassOutline } from "react-icons/io5";
import { IoIosNotificationsOutline,IoMdSettings } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";


const FeaturesL = () => {
  return (
    <div className="p-7 flex flex-col gap-5 mt-10 ">
    <span className="font-semibold text-[36px]">FEATURES OVERVIEW</span>
    <div className="flex flex-wrap gap-4">
    <CardNoImg title="Event Discovery" pText="Browse all campus events in one place and find what matters to you " color="blue"><IoCompassOutline className="text-blue-500"/></CardNoImg>
    <CardNoImg title="Smart Suggestions" pText="Stay informed with reminders and important updates" color="green"><FaRegUser className="text-green-500"/></CardNoImg>
    <CardNoImg title="Club Tools" pText="Create events, manage participation, and tract engagement easily" color="yellow"><IoMdSettings className="text-yellow-500"/></CardNoImg>
    <CardNoImg title="Notifications" pText="Receive event recommendations based on your interests and schedule" color="red"><IoIosNotificationsOutline  className="text-red-500"/></CardNoImg>
    </div>
    </div>
  )
}

export default FeaturesL
