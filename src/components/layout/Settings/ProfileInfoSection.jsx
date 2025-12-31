import { useState, useRef, useEffect } from "react";
import { auth } from "@/firebase/firebase";
import { uploadImage } from "@/firebase/storage";
const ProfileInfoSection = ({ student, onUpdate }) => {
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    avatar: "",
  });

  // 🔹 Sync Firestore → UI
  useEffect(() => {
    if (!student) return;

    setFormData({
      fullName: student.fullName || "",
      email: student.profile.email || "",
      phone: student.phone || "",
      avatar:
        student.avatar ||
        "https://api.dicebear.com/7.x/fun-emoji/svg?seed=User",
    });
  }, [student]);

  // 🔹 Image picker
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // 🔹 Local image preview (upload later)
  const handleProfileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const user = auth.currentUser;
    if(!user) return;

    const imageUrl = await uploadImage(
      file, `avatars/students/${user.uid}.jpg`
    );

    setFormData((prev) =>({
      ...prev,
      avatar: imageUrl,
    }));

    await onUpdate({avatar: imageUrl});

  };

  // 🔹 Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Save → parent → Firestore
  const handleSave = () => {
    onUpdate({
      fullName: formData.fullName,
      phone: formData.phone,
      avatar: formData.avatar,
      
    });

    setIsEditing(false);
  };

  if (!student) {
    return <div>Loading profile...</div>;
  }
  return (
    <div className=" space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span
          className="material-symbols-outlined text-blue-500"
          style={{ fontSize: "32px" }}
        >
          person_edit
        </span>
        <h1 className="text-[26px]">Profile Info</h1>
      </div>
      <div className="bg-white p-5 rounded-md border flex flex-col">
        <div className="flex items-center justify-end ">
          {!isEditing ? (
            <div className="border px-4 py-2 rounded-sm flex  gap-2 items-center ">
              <span className="material-symbols-outlined">edit</span>
              <button
                className="text-blue-600 text-sm"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            </div>
          ) : (
            <div className="border px-4 py-2 rounded-sm flex  gap-2 items-center">
              <span className="material-symbols-outlined">save</span>
              <button className="text-green-600 text-sm" onClick={handleSave}>
                Save
              </button>
            </div>
          )}
        </div>

        {/* Fields */}
        <div className="flex gap-5 md:flex-row md:items-center flex-col">
          <div className="relative p-2">
            <img
              src={formData.avatar || "https://api.dicebear.com/7.x/fun-emoji/svg?seed=User"}
              alt="avatar"
              className="w-44 h-44 rounded-full bg-blue-100 relative"
            />
            {isEditing && (
              <div>
                <input
                  type="file"
                  className="hidden"
                  id="profileImg"
                  ref={fileInputRef}
                  onChange={handleProfileChange}
                  accept="image/*"
                />
                <span
                  className="material-symbols-outlined p-2 bg-blue-100 text-blue-500 rounded-full absolute top-35 right-5"
                  onClick={handleImageClick}
                >
                  photo_camera
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col md:gap-5 gap-2 w-[80%]">
            {/* Name */}
            <div>
              <label className="text-sm text-gray-500">Display Name</label>
              {isEditing ? (
                <div className=" border rounded px-3 py-2 mt-1 bg-[#f8f9fa]">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="outline-none w-full"
                  />
                </div>
              ) : (
                <p className="border rounded px-3 py-2 mt-1 bg-[#f8f9fa]">
                  {student.fullName}
                </p>
              )}
            </div>

            <div className="flex md:gap-10 flex-col md:flex-row sm:gap-5 w-full">
              <div className="w-full">
                <label className="text-sm text-gray-500">Email Address</label>
                {isEditing ? (
                  <div className="w-full border rounded px-3 py-2 mt-1 bg-[#f8f9fa]">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="outline-none w-full"
                    />
                  </div>
                ) : (
                  <p className="border rounded px-3 py-2 mt-1 bg-[#f8f9fa]">
                    {student.profile.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="w-full">
                <label className="text-sm text-gray-500">Phone Number</label>
                {isEditing ? (
                  <div className="w-full border rounded px-3 py-2 mt-1 bg-[#f8f9fa]">
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full outline-none"
                    />
                  </div>
                ) : (
                  <p className="border rounded px-3 py-2 mt-1 bg-[#f8f9fa]">
                    {student.phone || "Not provided"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoSection;
