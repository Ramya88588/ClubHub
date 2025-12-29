
import HeaderSection from "@/components/layout/Settings/HeaderSection";
import ProfileInfoSection from "@/components/layout/Settings/ProfileInfoSection";
import PreferencesSection from "@/components/layout/Settings/PreferencesSection";
import NotificationsSection from "@/components/layout/Settings/NotificationsSection";
import DangerZoneSection from "@/components/layout/Settings/DangerZoneSection";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebase";
import { getStudentById, updateStudent } from "@/firebase/collections";


// const user = {
//   id: "u_001",

//   // 🔹 Basic identity
//   name: "Alex Johnson",
//   email: "alexjohnson@college.edu",
//   phoneNumber: "9999999999",
//   role: "STUDENT",

//   // 🔹 Profile visuals
//   avatar: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Alex",

//   // 🔹 Preferences section
//   interests: [
//     "Web Development",
//     "AI & ML",
//     "Hackathons"
//   ],

//   // 🔹 Academic schedule section
//   timetableImage: "https://cdn.app.com/timetables/u_001.png",
//   // or null if not uploaded

//   // 🔹 Notifications section
//   notifications: {
//     eventReminders: true,
//     hiringAlerts: false,
//     feedbackRequests: true
//   },

//   // 🔹 Account / system
//   isActive: true,
//   createdAt: "2025-01-10T10:30:00Z",
//   updatedAt: "2025-03-26T08:45:00Z"
// };

const SettingsPage = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch student ONCE
  useEffect(() => {
    const fetchStudent = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const data = await getStudentById(user.uid);
      setStudent(data);
      setLoading(false);
    };

    fetchStudent();
  }, []);

  // 🔹 Generic update handler
  const handleUpdate = async (updates) => {
    const user = auth.currentUser;
    if (!user) return;

    await updateStudent(user.uid, updates);

    // update UI immediately
    setStudent((prev) => ({ ...prev, ...updates }));
  };

  if (loading) {
    return <div className="p-6">Loading settings...</div>;
  }

  return (
    <div className="bg-gray-50 min-w-fit">
      <div className="max-w-6xl mx-auto p-6 space-y-8 bg-gray-50">
        <HeaderSection student={student} />

        <ProfileInfoSection
          student={student}
          onUpdate={handleUpdate}
        />

        <PreferencesSection
          student={student}
          onUpdate={handleUpdate}
        />

        <NotificationsSection
          student={student}
          onUpdate={handleUpdate}
        />

        <DangerZoneSection />
      </div>
    </div>
  );
};

//   return (
//     <div className="bg-gray-50 min-w-fit">
//     <div className="max-w-6xl mx-auto p-6 space-y-8 bg-gray-50">
//       <HeaderSection />
//       <ProfileInfoSection />
//       <PreferencesSection />
//       <NotificationsSection />
//       <DangerZoneSection />
//     </div>
//     </div>
//   );
// };

export default SettingsPage;
