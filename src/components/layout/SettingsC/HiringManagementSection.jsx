import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebase";
import { updateClubHiring, getClubById } from "@/firebase/collections";

const HiringManagementSection = () => {
  const [hiringOpen, setHiringOpen] = useState(false);
  const [formLink, setFormLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const clubId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchHiring = async () => {
      if (!clubId) return;

      const club = await getClubById(clubId);
      if (club) {
        setHiringOpen(club.hiringOpen || false);
        setFormLink(club.gformLink || "");
      }
      setLoading(false);
    };

    fetchHiring();
  }, [clubId]);

  if (loading) return null;

  return (
    <div className="bg-white border rounded-xl p-6 space-y-4">
      {/* Header + Edit/Save */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Hiring</h2>

        <button
          onClick={async () => {
            if (isEditing) {
              // SAVE to Firestore
              await updateClubHiring(clubId, {
                hiringOpen,
                gformLink: formLink,
              });
              alert("Hiring settings updated");
            }
            setIsEditing(!isEditing);
          }}
          className="text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-700">Hiring Status</span>

        <button
          disabled={!isEditing}
          onClick={() => setHiringOpen(!hiringOpen)}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition
            ${hiringOpen ? "bg-green-500" : "bg-gray-300"}
            ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
              hiringOpen ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>

      {/* Form Link */}
      <div>
        <label className="text-sm text-gray-600">
          Google Form Link
        </label>
        <input
          type="url"
          value={formLink}
          disabled={!isEditing}
          onChange={(e) => setFormLink(e.target.value)}
          placeholder="https://forms.gle/..."
          className={`mt-1 w-full border rounded-lg px-3 py-2 text-sm
            ${!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}
          `}
        />
      </div>
    </div>
  );
};

export default HiringManagementSection;
