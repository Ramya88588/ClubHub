import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebase";
import { updateClubPreferences } from "@/firebase/collections";

const ALL_PREFERENCES = [
  "Web Development",
  "AI & ML",
  "Hackathons",
  "Competitive Coding",
  "Design",
  "Robotics",
  "Art",
  "Entertainment",
  "CP",
  "Music",
  "BlockChain",
  "GenAI",
  "UI/UX",
  "Java",
  "Python",
  "C++",
];

const PreferencesSection = ({ club }) => {
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // 🔹 Sync Firestore → UI
  useEffect(() => {
    if (club?.preferences) {
      setSelectedPreferences(club.preferences);
    }
  }, [club]);

  // 🔹 Toggle preference
  const handleToggle = (pref) => {
    if (!isEditing) return;

    setSelectedPreferences((prev) =>
      prev.includes(pref)
        ? prev.filter((p) => p !== pref)
        : [...prev, pref]
    );
  };

  // 🔹 Save to Firestore
  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await updateClubPreferences(user.uid, selectedPreferences);
      setIsEditing(false);
      alert("Preferences updated");
    } catch (err) {
      console.error(err);
      alert("Failed to save preferences");
    }
  };

  if (!club) return null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h2 className="text-[26px]">Preferences</h2>
      </div>

      <div className="bg-white p-5 rounded-md border flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <p className="text-[18px] font-light">
            Help students find your club easily
          </p>

          {!isEditing ? (
            <button
              className="border px-4 py-2 rounded-sm"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          ) : (
            <button
              className="border px-4 py-2 rounded-sm text-green-600"
              onClick={handleSave}
            >
              Save
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {ALL_PREFERENCES.map((pref) => {
            const selected = selectedPreferences.includes(pref);

            return (
              <button
                key={pref}
                disabled={!isEditing}
                onClick={() => handleToggle(pref)}
                className={`px-3 py-1 rounded-full text-sm border
                  ${
                    selected
                      ? "bg-green-500 text-white border-green-600"
                      : "bg-gray-100 text-gray-700 border-gray-300"
                  }
                `}
              >
                {pref}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PreferencesSection;
