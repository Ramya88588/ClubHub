import HeaderSection from "@/components/layout/Settings/HeaderSection";
import ProfileInfoSection from "@/components/layout/Settings/ProfileInfoSection";
import PreferencesSection from "@/components/layout/Settings/PreferencesSection";
import NotificationsSection from "@/components/layout/Settings/NotificationsSection";
import DangerZoneSection from "@/components/layout/Settings/DangerZoneSection";
import { useEffect, useState, useCallback } from "react";
import { auth } from "@/firebase/firebase";
import { getStudentById, updateStudent } from "@/firebase/collections";
import Loader from "@/components/shared/Loader";

const SettingsPage = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Central fetch (reusable)
  const fetchStudent = useCallback(async () => {
    const user = auth.currentUser;
    if (!user) return;

    const data = await getStudentById(user.uid);
    setStudent(data);
    setLoading(false);
  }, []);

  // 🔹 Initial load
  useEffect(() => {
    fetchStudent();
  }, [fetchStudent]);

  // ✅ SAFE update handler (supports dot-notation)
  const handleUpdate = async (updates) => {
    const user = auth.currentUser;
    if (!user) return;

    await updateStudent(user.uid, updates);

    // 🔥 Deep local sync (CRITICAL)
    setStudent((prev) => {
      if (!prev) return prev;

      const updated = { ...prev };

      Object.entries(updates).forEach(([key, value]) => {
        if (key.includes(".")) {
          const [parent, child] = key.split(".");
          updated[parent] = {
            ...updated[parent],
            [child]: value,
          };
        } else {
          updated[key] = value;
        }
      });

      return updated;
    });
  };

  if (loading) {
    return <Loader message="Loading settings.." />;
  }

  return (
    <div className="bg-gray-50 min-w-fit">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <HeaderSection student={student} />

        <ProfileInfoSection student={student} onUpdate={handleUpdate} />

        <PreferencesSection
          student={student}
          onUpdate={handleUpdate}
          refetchStudent={fetchStudent}
        />

        <NotificationsSection student={student} onUpdate={handleUpdate} />

        <DangerZoneSection />
      </div>
    </div>
  );
};

export default SettingsPage;
