import { useState } from "react";
import { clubs } from "./ProfileInfo";

const ALL_preferences = [
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

const PreferencesSection = () => {
  // UI state from backend
  const [selectedPreferences, setselectedPreferences] = useState(
    clubs[0].preferences
  );

  const [isEditing, setIsEditing] = useState(false);

  // toggle interest
  const handleToggle = (preference) => {
    if (selectedPreferences.includes(preference)) {
      setselectedPreferences(
        selectedPreferences.filter((item) => item !== preference)
      );
    } else {
      setselectedPreferences([...selectedPreferences, preference]);
    }
  };

  // save to backend
  const handleSave = () => {
    clubs[0] = {
      ...clubs[0],
      preferences: selectedPreferences,
    };

    setIsEditing(false);
    console.log("Backend updated:", clubs);
  };

  return (
    <div className=" space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 50 50"
          fill="none"
        >
          <path
            d="M22.9167 43.75V31.25H27.0833V35.4167H43.75V39.5833H27.0833V43.75H22.9167ZM6.25 39.5833V35.4167H18.75V39.5833H6.25ZM14.5833 31.25V27.0833H6.25V22.9167H14.5833V18.75H18.75V31.25H14.5833ZM22.9167 27.0833V22.9167H43.75V27.0833H22.9167ZM31.25 18.75V6.25H35.4167V10.4167H43.75V14.5833H35.4167V18.75H31.25ZM6.25 14.5833V10.4167H27.0833V14.5833H6.25Z"
            fill="#34a853"
          />
        </svg>
        <h2 className="text-[26px]">Preferences</h2>
      </div>
      <div className="bg-white p-10 rounded-md border flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[20px] font-light">
              Help students find your club easily by adding your focus areas
            </p>
          </div>
          <div className="">
            {!isEditing ? (
              <button
                className="text-green-600 text-sm cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                <div className="border px-4 py-2 rounded-sm flex  gap-2 items-center ">
                  <span className="material-symbols-outlined">edit</span>
                  Edit
                </div>
              </button>
            ) : (
              <button
                className="text-blue-600 text-sm cursor-pointer"
                onClick={handleSave}
              >
                <div className="border px-4 py-2 rounded-sm flex  gap-2 items-center">
                  <span className="material-symbols-outlined">save</span>
                  Save
                </div>
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {ALL_preferences.map((preference) => {
            const isSelected = selectedPreferences.includes(preference);

            return (
              <button
                key={preference}
                disabled={!isEditing}
                onClick={() => handleToggle(preference)}
                className={`px-3 py-1 rounded-full text-sm border
                ${
                  isSelected
                    ? "bg-green-500 text-white border-green-600"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }
                ${isEditing ? "cursor-pointer" : "cursor-default"}
              `}
              >
                {preference}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PreferencesSection;
