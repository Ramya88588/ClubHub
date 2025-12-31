import { uploadTimetableImage } from "@/firebase/uploadTimetable";
import { getTimetableFromUpload } from "@/ai/timetable";
import { auth } from "@/firebase/firebase";

const AcademicScheduleSection = ({
  timetableImage,
  isEditing,
  onTimetableChange,
}) => {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !isEditing) return;

    // 🔹 UI preview (unchanged behavior)
    const previewUrl = URL.createObjectURL(file);
    onTimetableChange(previewUrl);

    try {
      // 🔹 Upload to Firebase Storage
      const publicUrl = await uploadTimetableImage(
        file,
        auth.currentUser?.uid || "anonymous"
      );

      console.log("Firebase Storage URL:", publicUrl);

      // 🔹 Extract timetable JSON via AI
      const timetableJSON = await getTimetableFromUpload(publicUrl);

      console.log("Extracted timetable JSON:", timetableJSON);
    } catch (err) {
      console.error("Timetable AI error:", err.message);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-[24px] mb-3">Academic Schedule</h2>

      {timetableImage ? (
        <div className="relative">
          <img
            src={timetableImage}
            alt="Timetable"
            className="w-full h-40 object-cover rounded border"
          />

          {isEditing && (
            <label className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer text-white rounded">
              Change Timetable
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>
      ) : (
        <label
          className={`h-28 border-2 border-dashed rounded flex items-center justify-center
          ${isEditing ? "cursor-pointer text-gray-500" : "text-gray-300"}`}
        >
          Click to Upload Timetable
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          )}
        </label>
      )}
    </div>
  );
};

export default AcademicScheduleSection;
