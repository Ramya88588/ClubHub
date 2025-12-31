import { useState,useEffect } from "react";
import ToggleItem from "./Toggle";

// const users = [
//   {
//     id: 1,
//     notifications: {
//       eventReminders: true,
//       hiringAlerts: false,
//       feedbackRequests: true,
//     },
//   },
// ];

const NotificationsSection = ({student,onUpdate}) => {
  const [notifications, setNotifications] = useState({
    eventReminders: false,
    hiringAlerts: false,
    feedbackRequests: false,
  });

  useEffect(()=>{
    if(!student?.notifications) return;

    setNotifications({
      eventReminders: student.notifications.eventReminders ?? false,
      hiringAlerts : student.notifications.hiringAlerts ?? false,
      feedbackRequests: student.notifications.feedbackRequests ?? false,
    });
  },[student]);

  const handleToggle = (key) => {
    const updated = {
      ...notifications,
      [key]: !notifications[key],
    };

    setNotifications(updated);

    
    onUpdate({
      notifications: updated,
    });
  };

  if (!student) return null;
  return (
    <div className="mt-10 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-blue-500" style={{ fontSize: "32px" }}>edit_notifications</span>
        <h2 className="text-[26px]">Notifications</h2>
      </div>

      {/* Body */}
      <div className="bg-white p-5 rounded-md border space-y-4">
        <ToggleItem
          title="Event reminders"
          description="Receive push Notifications 1 hour before events you've joined starts"
          enabled={notifications.eventReminders}
          onToggle={() => handleToggle("eventReminders")}
        />

        <ToggleItem
          title="Hiring alerts"
          description="Get notifies when clubs you follow open recruitments"
          enabled={notifications.hiringAlerts}
          onToggle={() => handleToggle("hiringAlerts")}
        />

        <ToggleItem
          title="Feedback requests"
          description="Receive a quick survey after attending an event to help clubs improve"
          enabled={notifications.feedbackRequests}
          onToggle={() => handleToggle("feedbackRequests")}
        />
      </div>
    </div>
  );
};

export default NotificationsSection;
