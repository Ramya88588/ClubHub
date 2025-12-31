import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// mock backend
const registrations = [];

// mock events backend
const events = [
  {
    id: 1,
    title: "Event Title",
    date: "27/03/2025",
    gFormLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSfFakeFormLink/viewform?embedded=true",
  },
];

const EventRegister = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();

  // mock logged-in user
  const user = {
    id: 101,
    name: "Alex Johnson",
    email: "alexjohnson@college.edu",
  };

  // get event using URL param
  const event = events.find((e) => e.id === Number(eventId));

  const [registered, setRegistered] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Event not found</p>
      </div>
    );
  }

  const handleFinalRegister = () => {
    const payload = {
      eventId: event.id,
      userId: user.id,
      registeredAt: new Date().toISOString(),
    };

    registrations.push(payload);
    console.log("Backend registrations:", registrations);

    setRegistered(true);
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-white border rounded-md p-6 space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">
              Register for the{" "}
              <span className="text-blue-500">{event.title}</span>
            </h1>
            <p className="text-gray-500">
              EVENT: {event.title} – {event.date}
            </p>
          </div>

          <button
            className="text-sm text-gray-600"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Display Name</label>
            <input
              type="text"
              value={user.name}
              disabled
              className="w-full border rounded p-2 bg-[#f8f9fa]"
            />
          </div>

          <div>
            <label className="text-sm">Email Address</label>
            <input
              type="text"
              value={user.email}
              disabled
              className="w-full border rounded p-2 bg-[#f8f9fa]"
            />
          </div>
        </div>

        {/* Google Form (always visible) */}
        <div className="border rounded-md h-[450px] overflow-hidden">
          <iframe
            src={event.gFormLink}
            title="Google Form"
            className="w-full h-full"
          />
        </div>

        {/* Action */}
        <div className="flex justify-end">
          {!registered ? (
            <button
              onClick={handleFinalRegister}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Register Here
            </button>
          ) : (
            <span className="text-green-600 font-medium">
              ✅ Registration completed
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventRegister;
