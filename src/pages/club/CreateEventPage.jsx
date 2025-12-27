import {
  Upload,
  Plus,
  //ListChecks,
  ClipboardEdit,
  Building2,
  CalendarClock,
} from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { getUserById } from "@/firebase/collections";
import { auth } from "@/firebase/firebase";
//helpers

const buildDateTime = (date, time) =>
  date && time ? new Date(`${date}T${time}`) : null;

// const formatIndianDateTime = (date, time) => {
//   const d = new Date(`${date}T${time}`);

//   const day = String(d.getDate()).padStart(2, "0");
//   const month = String(d.getMonth() + 1).padStart(2, "0");
//   const year = d.getFullYear();

//   let hours = d.getHours();
//   const minutes = String(d.getMinutes()).padStart(2, "0");
//   const ampm = hours >= 12 ? "PM" : "AM";

//   hours = hours % 12 || 12;

//   return `${day}/${month}/${year}, ${hours}:${minutes} ${ampm}`;
// };

const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};
const formatTime = (date, time) => {
  const d = new Date(`${date}T${time}`);
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
};
export default function CreateEventPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { isValid },
    } = useForm({
    mode: "onChange",
    defaultValues: {
      category: "",
      highlights: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "highlights",
  });
  /* ---------------- RESTORE LOCAL DRAFT ---------------- */
	useEffect(() => {
		const saved = localStorage.getItem("eventDraft");
		if (!saved) return;

		const data = JSON.parse(saved);

		// const allowedCategories = [
		// 	"Technical",
		// 	"Workshop",
		// 	"Music",
		// 	"Cultural",
    //   "Seminar"
		// ];
    const allowedCategories = [
      "Workshop",
      "Seminar",
      "Club",
      "Music",
      "Tech",
      "Art",
      "Sports",
      "Hackathon",
    ];

		Object.entries(data).forEach(([key, value]) => {
			if (key === "category") {
				if (allowedCategories.includes(value)) {
					setValue("category", value);
				} else {
					setValue("category", "");
				}
			} else {
				setValue(key, value);
			}
		});
	}, [setValue]);

  /* ---------------- AUTOSAVE LOCAL DRAFT ---------------- */
  const watched = watch();
  useEffect(() => {
    localStorage.setItem("eventDraft", JSON.stringify(watched));
  }, [watched]);

  const onSubmit = async (formData) => {
    const startDateTime = buildDateTime(formData.startDate, formData.startTime);
    let endDateTime = buildDateTime(formData.endDate, formData.endTime);

    if (endDateTime <= startDateTime) {
      endDateTime.setDate(endDateTime.getDate() + 1);
    }

    // Get logged-in user
    const user = auth.currentUser;
    if (!user) {
      alert("User not logged in");
      return;
    }

    // Get club data from users collection
    const clubUser = await getUserById(user.uid);

    if (!clubUser || clubUser.role !== "club") {
      alert("Only club accounts can create events");
      return;
    }
    const eventTypeThemeMap = {
      Workshop: "yellow",
      Seminar: "blue",
      Club: "green",
      Music: "red",
      Tech: "blue",
      Coding: "blue",
      Art: "yellow",
      Sports: "green",
      Hackathon: "yellow"
    };
    // payload
    const payload = {
      clubId: clubUser.uid,          
      clubName: clubUser.clubname,   
      head: clubUser.clubname,

      title: formData.title,
      type: formData.category,
      description: formData.description,

      highlights: formData.highlights.filter(Boolean),

      image: "https://picsum.photos/seed/event/600/400",

      location: {
        venue: formData.venue,
        college: formData.college,
        area: formData.area,
      },

      date: formatDate(formData.startDate),

      startDateTime,
      endDateTime,

      time: {
        start: formatTime(formData.startDate, formData.startTime),
        end: formatTime(formData.endDate, formData.endTime),
      },

      registeredUsers: [],       
      status: "upcoming",        

      theme :eventTypeThemeMap[formData.category] || "green",

      feedbackFormLink: formData.feedbackFormLink,

      createdAt: serverTimestamp(),
    };

    await addDoc(collection(db, "events"), payload);

    localStorage.removeItem("eventDraft");
    alert("✅ Event published successfully");
    navigate(-1);
  };
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-[#f8f9fa]">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 border-b shadow-sm top-0 sticky">
        <button type="button" className="" onClick={handleBack}>
          ← Back
        </button>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("eventDraft");
              navigate(-1);
            }}
          >
            Cancel
          </button>
            <button
              type="submit"
              form="create-event-form"
              disabled={!isValid}
              className={`flex gap-2 px-4 py-2 rounded ${
                isValid
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              <Upload /> Publish
            </button>
        </div>
      </div>
      <form
        id="create-event-form"
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-6xl mx-auto p-6 space-y-6 bg-[#f8f9fa]"
      >
        <h1 className="text-24px">Create a New Event</h1>

        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left */}
          <div className="md:col-span-2 bg-white border-2 rounded-lg p-5 space-y-4">
            <div className="flex gap-2 items-center">
              <ClipboardEdit className="text-green-500"></ClipboardEdit>
              <h3 className="font-semibold text-[24px]">Event Details</h3>
            </div>

            <label className="font-light text-[16px]">EVENT TITLE</label>
            <input
              {...register("title", { required: true })}
              placeholder="Eg, Annual Tech Fest 2025"
              className="w-full border px-3 py-2 rounded bg-[#f8f9fa] text-[16px] placeholder:font-light"
            />
            <label className="font-light text-[16px]">CATEGORY</label>
            <select
              {...register("category", { required: true })}
              className="w-full border px-3 py-2 rounded bg-[#f8f9fa] font-light text-gray-500/85 text-[16px]"
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Hackathon" className="font-normal text-black">
                Hackathon
              </option>
              <option value="Workshop" className="font-normal text-black">
                Workshop
              </option>
              <option value="Seminar" className="font-normal text-black">
                Seminar
              </option>
              <option value="Club" className="font-normal text-black ">
                Club
              </option>
              <option value="Music" className="font-normal text-black ">
                Music
              </option>
              <option value="Tech" className="font-normal text-black ">
                Tech
              </option>
              <option value="Art" className="font-normal text-black ">
                Art
              </option>
              <option value="Sports" className="font-normal text-black ">
                Sports
              </option>
            </select>
            <label className="font-light text-[16px]">DESCRIPTION</label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Describe the event agenda, prerequisites and goals..."
              className="w-full border px-3 py-2 rounded min-h-[100px] bg-[#f8f9fa] text-[16px] placeholder:font-light"
            />

            {/* Highlights */}

            <div>
              <p className="text-[16px] font-light mb-2">HIGHLIGHTS</p>

              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 mb-2">
                  <input
                    {...register(`highlights.${index}`)}
                    className="w-full border px-3 py-2 rounded bg-[#f8f9fa]"
                    placeholder="Event highlight"
                  />

                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={() => append("")}
                className="text-sm text-green-600"
              >
                + Add highlight
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4">
            {/* Location */}
            <div className="bg-white border rounded-lg p-5 space-y-3">
              <div className="flex gap-2">
                <Building2 className="text-green-500"></Building2>
                <h3 className="font-semibold">Location</h3>
              </div>

              <label className="font-light text-[16px]">VENUE</label>
              <input
                {...register("venue", { required: true })}
                placeholder="Eg, Newton Hall"
                className="w-full text-[16px] placeholder:font-ligjt border px-3 py-2 rounded bg-[#f8f9fa]"
              />
              <label className="font-light text-[16px]">COLLEGE</label>
              <input
                {...register("college", { required: true })}
                placeholder="Eg, VIT-AP"
                className="w-full border px-3 py-2 text-[16px] font-light rounded bg-[#f8f9fa]"
              />
              <label className="font-light text-[16px]">AREA</label>
              <input
                {...register("area", { required: true })}
                placeholder="Near Secretery, Amaravathi"
                className="w-full border px-3 py-2 rounded bg-[#f8f9fa] text-[16px] font-light"
              />
            </div>

            {/* Time */}
            <div className="bg-white border rounded-lg p-5 space-y-3">
              <div className="flex gap-2 items-center">
                <CalendarClock className="text-green-500"></CalendarClock>
                <h3 className="font-semibold">Time</h3>
              </div>

              <label className="font-light text-[16px]">START TIME</label>
              <input
                type="date"
                {...register("startDate", { required: true })}
                className="w-full border px-3 py-2 rounded bg-[#f8f9fa] text-gray-400 font-light"
                onChange={(e) => {
                  e.target.classList.remove("text-gray-400", "font-light");
                  e.target.classList.add("text-gray-900", "font-normal");
                }}
              />
              <input
                type="time"
                {...register("startTime", { required: true })}
                className="w-full border px-3 py-2 rounded bg-[#f8f9fa] text-gray-400 font-light"
                onChange={(e) => {
                  e.target.classList.remove("text-gray-400", "font-light");
                  e.target.classList.add("text-gray-900", "font-normal");
                }}
              />
              <label className="font-light text-[16px]">END TIME</label>
              <input
                type="date"
                {...register("endDate", { required: true })}
                className="w-full border px-3 py-2 rounded bg-[#f8f9fa] font-light text-gray-400"
                onChange={(e) => {
                  e.target.classList.remove("text-gray-400", "font-light");
                  e.target.classList.add("text-gray-900", "font-normal");
                }}
              />
              <input
                type="time"
                {...register("endTime", { required: true })}
                className="w-full border px-3 py-2 rounded bg-[#f8f9fa] placeholder:font-light text-gray-400 font-light"
                onChange={(e) => {
                  e.target.classList.remove("text-gray-400", "font-light");
                  e.target.classList.add("text-gray-900", "font-normal");
                }}
              />
            </div>

            {/* Upload */}
            <div className="bg-white border rounded-lg p-5 text-center">
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  {...register("coverImage")}
                  id="coverImage"
                  className="hidden"
                />
                <label
                  htmlFor="coverImage"
                  className="flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="text-green-500" size={40} />
                  <p className="text-xs text-gray-500">Upload Cover Image</p>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-white border rounded-lg p-5">
          <h3 className="font-medium text-[24px] mb-2">Feedback Form</h3>
          <p className="font-light mb-2">
            You definitely wanna hear back from the attendees, add the iframe of
            google form here
          </p>
          <input
            {...register("feedbackFormLink")}
            placeholder="Google Form link"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </form>
    </div>
  );
}
