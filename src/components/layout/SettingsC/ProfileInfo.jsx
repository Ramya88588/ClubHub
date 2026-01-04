import { useState } from "react";
import InputField from "./InputField";
import { useRef } from "react";

// mockBackend.js
export const clubs = [
  {
    id: 1,
    clubName: "The Coding Club",
    clubHeadName: "Sagar Sinha",
    email: "codingclub@vitap.ac.in",
    sinceYear: "2021",

    about:
      "The Coding Club focuses on improving programming skills and problem-solving through hackathons, hackathons, and peer learning.",

    website: "https://the-coding-club.com",
    instagram: "https://www.instagram.com/the_coding_club",
    linkedin: "https://www.linkedin.com/company/coding-club",

    preferences: [
      "Web Development",
      "AI & ML",
      "Hackathons",
      "Competitive Coding",
    ],

    hiringOpen: true,

    gFormLink: null,
    avatar: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Alex",
  },
];

const ProfileInfo = () => {
  const [club, setClub] = useState(clubs[0]);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    clubName: club.clubName,
    clubHeadName: club.clubHeadName,
    email: club.email,
    sinceYear: club.sinceYear,
    about: club.about,
    website: club.website,
    instagram: club.instagram,
    linkedin: club.linkedin,
    avatar: club.avatar,
  });
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      avatar: imageURL,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // UI update
    setClub(formData);

    // Backend update
    clubs[0] = {
      ...clubs[0],
      ...formData,
    };

    setIsEditing(false);
    console.log("Backend updated:", clubs);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <span
          className="material-symbols-outlined text-green-500"
          style={{ fontSize: "34px" }}
        >
          person_edit
        </span>
        <h2 className="text-[24px]"> Profile Info</h2>
      </div>
      <div className="bg-white p-10 rounded-md border flex flex-col">
        <div className="self-end">
          {!isEditing ? (
            <button
              className="border px-4 py-2 rounded-sm flex gap-2 text-green-600 text-sm cursor-pointer items-center"
              onClick={() => setIsEditing(true)}
            >
              <span className="material-symbols-outlined">edit</span>
              Edit
            </button>
          ) : (
            <button
              className="border px-4 py-2 rounded-sm flex gap-2 text-blue-600 text-sm cursor-pointer items-center"
              onClick={handleSave}
            >
              <span className="material-symbols-outlined">save</span>
              Save
            </button>
          )}
        </div>
        <div className="flex gap-5">
          <div className="relative p-2 shrink-0">
            <img
              src={formData.avatar}
              alt="avatar"
              className="w-44 h-44 rounded-full bg-blue-100 object-cover"
            />

            {isEditing && (
              <>
                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleProfileChange}
                  accept="image/*"
                />

                <span
                  className="material-symbols-outlined p-2 bg-blue-100 text-blue-500 rounded-full absolute bottom-89 right-4 cursor-pointer"
                  onClick={handleImageClick}
                >
                  photo_camera
                </span>
              </>
            )}
          </div>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Club Name"
                name="clubName"
                value={formData.clubName}
                isEditing={isEditing}
                onChange={handleChange}
              />

              <InputField
                label="Club Head Name"
                name="clubHeadName"
                value={formData.clubHeadName}
                isEditing={isEditing}
                onChange={handleChange}
              />

              <InputField
                label="Email Address"
                name="email"
                value={formData.email}
                isEditing={isEditing}
                onChange={handleChange}
              />

              <InputField
                label="Since the year"
                name="sinceYear"
                value={formData.sinceYear}
                isEditing={isEditing}
                onChange={handleChange}
              />
            </div>

            {/* About */}
            <div className="mt-5">
              <label className="text-sm text-gray-500">About Club</label>
              {isEditing ? (
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border rounded px-3 py-2 mt-1 bg-[#f8f9fa]"
                />
              ) : (
                <p className="w-full border rounded px-3 py-2 mt-1 bg-[#f8f9fa]">
                  {club.about}
                </p>
              )}
            </div>

            {/* Social links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <InputField
                label="Website Address"
                name="website"
                value={formData.website}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <InputField
                label="Instagram"
                name="instagram"
                value={formData.instagram}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <InputField
                label="LinkedIn"
                name="linkedin"
                value={formData.linkedin}
                isEditing={isEditing}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
