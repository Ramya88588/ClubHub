import { useState , useEffect} from "react";
import AcademicScheduleSection from "./AcademicScheduleSection";

const ALL_INTERESTS = [
  "Workshop", "Seminar", "Club", "Music", "Tech", "Art", "Sports", "Coding"
];
// const users = [
//   {
//     id: 1,
//     name: "Alex Johnson",
//     email: "alexjohnson@college.edu",
//     role: "STUDENT",
//     avatar: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Alex",
//     interests: ["abcdef", "Web Development", "AI & ML", "Hackathons"],
//     timetableImage: null,
//     phoneNumber: "9999999999",
//   },
// ];

const PreferencesSection = ({student, onUpdate}) => {
  // UI state from backend
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [timetableImage, setTimetableImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(()=>{
    if(!student) return;
    setSelectedInterests(student.preferences?.interest || []);
    setTimetableImage(student.preferences?.academicScheduleURL || null);
  }, [student]);

  // toggle interest
  const handleToggle = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(
        selectedInterests.filter((item) => item !== interest)
      );
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  
  const handleSave = () => {
    onUpdate({
      preferences:{
        interest: selectedInterests,
        academicScheduleURL: timetableImage,
      },
    });

    setIsEditing(false);
    console.log("Backend updated:", student);
  };

  if (!student) return null;
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
            fill="#4285F4"
          />
        </svg>
        <h2 className="text-[26px]">Preferences</h2>
      </div>
      <div className="bg-white p-5 rounded-md border flex flex-col gap-3">
        <div className="flex justify-between items-center">
        <div>
          <span className="text-[24px]">Your Interests</span>
          <p className="text-[20px] font-light">Select topics to personalize your event recommendations</p>
        </div>
        <div className="">
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
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {ALL_INTERESTS.map((interest) => {
            const isSelected = selectedInterests.includes(interest);

            return (
              <button
                key={interest}
                disabled={!isEditing}
                onClick={() => handleToggle(interest)}
                className={`px-3 py-1 rounded-full text-sm border
                ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }
                ${isEditing ? "cursor-pointer" : "cursor-default"}
              `}
              >
                {interest}
              </button>
            );
          })}
        </div>
      <AcademicScheduleSection
  timetableImage={timetableImage}
  isEditing={isEditing}
  onTimetableChange={setTimetableImage}
/>

      </div>
    </div>
  );
};

export default PreferencesSection;
