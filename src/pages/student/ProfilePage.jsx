import { useRef, useState } from "react";

export const INTERESTS = [
  "Web Development",
  "AI & ML",
  "Competitive Programming",
  "UI/UX Design",
  "Cyber Security",
  "Open Source",
  "Hackathons",
  "Robotics",
];

export default function ProfilePage() {
  const fileRef = useRef(null);

  const [timetable, setTimetable] = useState(null);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);

  /* ---------- handlers ---------- */

  const handleUploadClick = () => {
    fileRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setTimetable(file.name);
  };

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  /* ---------- UI ---------- */

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Profile Card */}
      <div className="border rounded-xl p-6 bg-white">

        {/* Back */}
        <button className="text-sm text-gray-500 mb-4">← Back</button>

        {/* Avatar */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <img
              src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=Alex"
              alt="avatar"
              className="w-28 h-28 rounded-full"
            />
            <button className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow">
              📷
            </button>
          </div>

          <h2 className="mt-3 font-semibold text-lg">Alex Johnson</h2>
          <p className="text-sm text-gray-500">alexjohnson@college.edu</p>

          <span className="mt-2 text-xs px-3 py-1 rounded bg-blue-100 text-blue-600">
            STUDENT
          </span>
        </div>

        {/* Actions */}
        <div className="mt-8 space-y-6">

          {/* Timetable */}
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              🗓️
              <div>
                <p className="font-medium">Timetable Status</p>
                <p className="text-sm text-red-500">
                  {timetable
                    ? `Uploaded: ${timetable}`
                    : "Please upload your timetable to get personalized notifications."}
                </p>
              </div>
            </div>

            <button
              onClick={handleUploadClick}
              className="bg-red-500 text-white px-4 py-1.5 rounded text-sm"
            >
              Upload Here
            </button>

            <input
              ref={fileRef}
              type="file"
              className="hidden"
              accept=".pdf,.png,.jpg"
              onChange={handleFileChange}
            />
          </div>

          {/* Interests */}
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              🎯
              <div>
                <p className="font-medium">Interests</p>
                <p className="text-sm text-red-500">
                  {selectedInterests.length === 0
                    ? "Please select your interests to get personalized notifications."
                    : "Selected interests shown below."}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowInterestModal(true)}
              className="bg-red-500 text-white px-4 py-1.5 rounded text-sm"
            >
              Select Here
            </button>
          </div>

          {/* Selected Interests */}
          {selectedInterests.length > 0 && (
            <div className="flex flex-wrap gap-2 pl-8">
              {selectedInterests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="mt-8 flex justify-end">
          <button className="bg-gray-200 px-4 py-1.5 rounded text-sm">
            ⚙ Go to Settings
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="border rounded-xl p-4 bg-white">
        <h3 className="font-medium mb-2">Active Sessions</h3>
        <p className="text-sm text-gray-400 text-center">
          No active sessions
        </p>
      </div>

      {/* Interests Modal */}
      {showInterestModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="font-semibold mb-4">Select Interests</h3>

            <div className="grid grid-cols-2 gap-3">
              {INTERESTS.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`border rounded-lg px-3 py-2 text-sm ${
                    selectedInterests.includes(interest)
                      ? "bg-blue-100 border-blue-500"
                      : ""
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowInterestModal(false)}
                className="text-sm text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowInterestModal(false)}
                className="bg-blue-500 text-white px-4 py-1.5 rounded text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
