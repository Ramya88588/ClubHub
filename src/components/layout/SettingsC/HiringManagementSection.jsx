import { useState, useEffect } from "react";
import { auth } from "@/firebase/firebase";
import { updateClubHiring } from "@/firebase/collections";

const HiringManagementSection = ({ club }) => {
  const [hiringOpen, setHiringOpen] = useState(false);
  const [gForm, setGForm] = useState("");

  /* 🔹 Sync Firestore → UI */
  useEffect(() => {
    if (!club) return;
    setHiringOpen(!!club.hiringOpen);
    setGForm(club.gFormLink || "");
  }, [club]);

  /* 🔹 Toggle hiring */
  const toggleHiring = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const updated = !hiringOpen;
    setHiringOpen(updated);

    await updateClubHiring(user.uid, {
      hiringOpen: updated,
    });
  };

  /* 🔹 Update Google Form link */
  const handleGFormChange = async (e) => {
    const value = e.target.value;
    setGForm(value);

    const user = auth.currentUser;
    if (!user) return;

    await updateClubHiring(user.uid, {
      gFormLink: value,
    });
  };

  if (!club) return null;

  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 mb-2">
        <span
          className="material-symbols-outlined text-green-500"
          style={{ fontSize: "34px" }}
        >
          person_add
        </span>
        <h2 className="text-[24px]">Hiring Management</h2>
      </div>

      <div className="bg-white p-5 rounded-md border">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Hiring Status</p>
            <p className="text-sm text-gray-500 mt-2">
              Add your respondent's Google Form link here
            </p>
          </div>

          {/* Toggle */}
          <button
            onClick={toggleHiring}
            className={`w-12 h-6 rounded-full flex items-center px-1
              ${hiringOpen ? "bg-green-500" : "bg-gray-300"}
            `}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full transition-transform
                ${hiringOpen ? "translate-x-6" : "translate-x-0"}
              `}
            />
          </button>
        </div>

        {/* Google Form */}
        <input
          type="text"
          className={`w-full border rounded-sm mt-4 p-2 outline-none placeholder:font-light
            ${!hiringOpen ? "cursor-not-allowed bg-gray-100" : ""}
          `}
          placeholder="https://docs.google.com/forms/..."
          value={gForm}
          onChange={handleGFormChange}
          disabled={!hiringOpen}
        />
      </div>
    </div>
  );
};

export default HiringManagementSection;
