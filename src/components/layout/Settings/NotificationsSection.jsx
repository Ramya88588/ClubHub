import { useState } from "react";
import ToggleItem from "./Toggle";

const users = [
  {
    id: 1,
    notifications: {
      eventReminders: true,
      hiringAlerts: false,
      feedbackRequests: true,
    },
  },
];

const NotificationsSection = () => {
  const [notifications, setNotifications] = useState(users[0].notifications);

  const handleToggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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
