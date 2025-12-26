import {
  Upload,
  Plus,
  ListChecks,
  ClipboardEdit,
  Building2,
  CalendarClock,
} from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router";
const formatIndianDateTime = (date, time) => {
  const d = new Date(`${date}T${time}`);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${day}/${month}/${year}, ${hours}:${minutes} ${ampm}`;
};

export default function CreateEventPage() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      highlights: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "highlights",
  });

  const onSubmit = (data) => {
    // 🔥 Convert to clean JSON (Firebase ready)
    const eventPayload = {
      eventTitle: data.title,
      category: data.category,
      description: data.description,
      highlights: data.highlights.filter(Boolean),

      location: {
        venue: data.venue,
        college: data.college,
        area: data.area,
      },

      time: {
        start: formatIndianDateTime(data.startDate, data.startTime),
        end: formatIndianDateTime(data.endDate, data.endTime),
      },

      coverImage: data.coverImage?.[0]?.name || null,
      feedbackFormLink: data.feedbackFormLink || null,

      createdAt: new Date().toISOString(),
      status: "published",
    };

    console.log("EVENT JSON (send to Firebase):");
    console.log(JSON.stringify(eventPayload, null, 2));
  };
  const navigate = useNavigate();
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
          <button type="button" className="">
            Cancel
          </button>
          <div className="flex  gap-2 w-fit bg-green-500 text-white px-4 py-1.5 rounded">
            <Upload />
            <button type="submit">Publish</button>
          </div>
        </div>
      </div>
      <form
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
              {...register("category")}
              className="w-full border px-3 py-2 rounded bg-[#f8f9fa] font-light text-gray-500/85 text-[16px]"
            >
              <option value="" className="" selected disabled>
                Select Category
              </option>
              <option value="Technical" className="font-normal text-black">
                Technical
              </option>
              <option value="Workshop" className="font-normal text-black">
                Workshop
              </option>
              <option value="Cultural" className="font-normal text-black ">
                Cultural
              </option>
            </select>
            <label className="font-light text-[16px]">DESCRIPTION</label>
            <textarea
              {...register("description")}
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
                {...register("venue")}
                placeholder="Eg, Newton Hall"
                className="w-full text-[16px] placeholder:font-ligjt border px-3 py-2 rounded bg-[#f8f9fa]"
              />
              <label className="font-light text-[16px]">COLLEGE</label>
              <input
                {...register("college")}
                placeholder="Eg, VIT-AP"
                className="w-full border px-3 py-2 text-[16px] font-light rounded bg-[#f8f9fa]"
              />
              <label className="font-light text-[16px]">AREA</label>
              <input
                {...register("area")}
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
                {...register("startDate")}
                className="w-full border px-3 py-2 rounded bg-[#f8f9fa] text-gray-400 font-light"
                onChange={(e) => {
                  e.target.classList.remove("text-gray-400", "font-light");
                  e.target.classList.add("text-gray-900", "font-normal");
                }}
              />
              <input
                type="time"
                {...register("startTime")}
                className="w-full border px-3 py-2 rounded bg-[#f8f9fa] text-gray-400 font-light"
                onChange={(e) => {
                  e.target.classList.remove("text-gray-400", "font-light");
                  e.target.classList.add("text-gray-900", "font-normal");
                }}
              />
              <label className="font-light text-[16px]">END TIME</label>
              <input
                type="date"
                {...register("endDate")}
                className="w-full border px-3 py-2 rounded bg-[#f8f9fa] font-light text-gray-400"
                onChange={(e) => {
                  e.target.classList.remove("text-gray-400", "font-light");
                  e.target.classList.add("text-gray-900", "font-normal");
                }}
              />
              <input
                type="time"
                {...register("endTime")}
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
