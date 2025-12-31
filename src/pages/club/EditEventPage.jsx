import {
  Upload,
  ClipboardEdit,
  Building2,
  CalendarClock,
} from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { getEventById, getUserById } from "@/firebase/collections";
import { auth } from "@/firebase/firebase";

const buildDateTime = (date, time) =>
  date && time ? new Date(`${date}T${time}`) : null;

const toDateInput = (ts) => {
  if (!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toISOString().split("T")[0];
};

const toTimeInput = (ts) => {
  if (!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toISOString().slice(11, 16);
};

export default function EditEventPage() {
  const { id } = useParams(); // eventId
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({ mode: "onChange" , shouldUnregister: false,
      defaultValues: {
    title: "",
    description: "",
    attendees: "",
    venue: "",
    college: "",
    area: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    highlights: [""],
    feedbackFormLink: "",
  },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "highlights",
  });

  /* ---------------- FETCH EVENT ---------------- */
  useEffect(() => {
    const loadEvent = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login");
        return;
      }
      try {
        const event = await getEventById(id);
        if (!event) {
          alert("Event not found");
          navigate(-1);
          return;
        }

        // 🔐 ownership check
        const user = auth.currentUser;
        const userDoc = await getUserById(user.uid);
        if (event.clubId !== user.uid || userDoc.role !== "CLUB") {
          alert("Unauthorized");
          navigate(-1);
          return;
        }
        reset({
          title: event.title,
          description: event.description,
          attendees: event.attendees,
          venue: event.location.venue,
          college: event.location.college,
          area: event.location.area,

          startDate: toDateInput(event.startDateTime),
          startTime: toTimeInput(event.startDateTime),

          endDate: toDateInput(event.endDateTime),
          endTime: toTimeInput(event.endDateTime),

          highlights: event.highlights?.length ? event.highlights : [""],
          feedbackFormLink: event.feedbackFormLink || "",
        },
        {
          keepDirty: false,
          keepTouched: false,
        }
      );


        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Failed to load event");
      }
    };

    loadEvent();
  }, [id, navigate, reset]);

  /* ---------------- UPDATE EVENT ---------------- */
  const onSubmit = async (data) => {
    try {
      const startDateTime = buildDateTime(data.startDate, data.startTime);
      let endDateTime = buildDateTime(data.endDate, data.endTime);

      if (endDateTime <= startDateTime) {
        endDateTime.setDate(endDateTime.getDate() + 1);
      }

      const payload = {
        title: data.title,
        description: data.description,
        highlights: data.highlights.filter(Boolean),
        attendees: data.attendees,
        location: {
          venue: data.venue,
          college: data.college,
          area: data.area,
        },
        startDateTime,
        endDateTime,
        feedbackFormLink: data.feedbackFormLink || "",
        updatedAt: serverTimestamp(),
      };

      await updateDoc(doc(db, "events", id), payload);
      alert("✅ Event updated successfully");
      navigate(-1);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update event");
    }
  };

  if (loading) {
    return <div className="p-10">Loading event...</div>;
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center bg-white p-4 border-b sticky top-0">
        <button onClick={() => navigate(-1)}>← Back</button>
        <button
          type="submit"
          form="edit-event-form"
          disabled={!isValid}
          className={`px-4 py-2 rounded ${
            isValid
              ? "bg-green-500 text-white"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          <Upload /> Save Changes
        </button>
      </div>

      <form
        id="edit-event-form"
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto p-6 space-y-6"
      >
        <div className="bg-white border rounded-lg p-6 space-y-4">
          <div className="flex gap-2 items-center">
            <ClipboardEdit className="text-green-500" />
            <h2 className="text-xl font-semibold">Edit Event</h2>
          </div>

          <input
            {...register("title", { required: true })}
            placeholder="Event title"
            className="w-full border px-3 py-2 rounded"
          />

          <textarea
            {...register("description", { required: true })}
            placeholder="Event description"
            className="w-full border px-3 py-2 rounded min-h-[120px]"
          />

          <input
            type="number"
            {...register("attendees", { required: true })}
            placeholder="Max attendees"
            className="w-full border px-3 py-2 rounded"
          />

          {/* Highlights */}
          <div>
            <p className="font-medium mb-2">Highlights</p>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mb-2">
                <input
                  {...register(`highlights.${index}`)}
                  className="w-full border px-3 py-2 rounded"
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

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input {...register("venue")} placeholder="Venue" className="border p-2 rounded" />
            <input {...register("college")} placeholder="College" className="border p-2 rounded" />
            <input {...register("area")} placeholder="Area" className="border p-2 rounded" />
          </div>

          {/* Time */}
          <div className="grid grid-cols-2 gap-4">
            <input type="date" {...register("startDate")} className="border p-2 rounded" />
            <input type="time" {...register("startTime")} className="border p-2 rounded" />
            <input type="date" {...register("endDate")} className="border p-2 rounded" />
            <input type="time" {...register("endTime")} className="border p-2 rounded" />
          </div>

          <input
            {...register("feedbackFormLink")}
            placeholder="Feedback form link"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </form>
    </div>
  );
}

