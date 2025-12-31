import { useState } from "react";

// mock backend
const announcementsData = [
  {
    id: 1,
    title: "Fall Hackathon 2025 Registration",
    message:
      "We are excited to announce that registrations for our annual Fall Hackathon are now open.",
    audience: "All Members",
    status: "DRAFT",
    createdAt: "Mar 24, 2025",
  },
  {
    id: 2,
    title: "September Hackathon 2025 Registration",
    message:
      "Registrations for September Hackathon are now open. Participate and win exciting prizes.",
    audience: "All Members",
    status: "SENT",
    createdAt: "Mar 10, 2025",
  },
];

const Announcements = () => {
  const [announcements, setAnnouncements] = useState(announcementsData);
  const [editingId, setEditingId] = useState(null);
  const [draftSearch, setDraftSearch] = useState("");
  const [pastSearch, setPastSearch] = useState("");
  const handleEditDraft = (draft) => {
    setForm({
      title: draft.title,
      message: draft.message,
      audience: draft.audience,
    });

    setEditingId(draft.id);

    setAnnouncements((prev) => prev.filter((a) => a.id !== draft.id));
  };

  const [form, setForm] = useState({
    title: "",
    message: "",
    audience: "All Members",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const saveAnnouncement = (status) => {
    if (!form.title || !form.message) return;

    const newAnnouncement = {
      id: editingId || Date.now(),
      title: form.title,
      message: form.message,
      audience: form.audience,
      status,
      createdAt: new Date().toDateString(),
    };

    setAnnouncements((prev) => [newAnnouncement, ...prev]);

    console.log("Backend updated:", newAnnouncement);

    setForm({
      title: "",
      message: "",
      audience: "All Members",
    });

    setEditingId(null);
  };

  const drafts = announcements.filter(
    (a) =>
      a.status === "DRAFT" &&
      (a.title.toLowerCase().includes(draftSearch.toLowerCase()) ||
        a.message.toLowerCase().includes(draftSearch.toLowerCase()))
  );

  const sent = announcements.filter(
    (a) =>
      a.status === "SENT" &&
      (a.title.toLowerCase().includes(pastSearch.toLowerCase()) ||
        a.message.toLowerCase().includes(pastSearch.toLowerCase()))
  );

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <div className="p-6 max-w-6xl mx-auto space-y-8 ">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">Announcements</h1>
          <p className="text-gray-500">
            Manage and send updates to your club members, keep everyone informed
            about upcoming events
          </p>
        </div>

        {/* Create */}
        <div className="bg-white border rounded-md p-5 space-y-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined bg-red-200 rounded-full p-2 text-red-600">
              edit_note
            </span>
            <h2 className="font-medium text-xl">Create New Announcement</h2>
          </div>
          <div className="flex gap-5 mt-5">
            <div className="w-full">
              <label htmlFor="" className="font-light text-sm">
                ANNOUNCEMENT TITLE
              </label>
              <input
                type="text"
                name="title"
                placeholder="Announcement Title"
                value={form.title}
                onChange={handleChange}
                className="w-full border rounded p-2 bg-[#f8f9fa]"
              />
            </div>
            <div>
              <label htmlFor="" className="font-light text-sm">
                AUDIENCE
              </label>
              <br />
              <select
                name="audience"
                value={form.audience}
                onChange={handleChange}
                className="border rounded p-2 bg-[#f8f9fa]"
              >
                <option>All Members</option>
                <option>Core Team</option>
              </select>
            </div>
          </div>
          <label htmlFor="" className="font-light text-sm">
            MESSAGE
          </label>
          <textarea
            name="message"
            placeholder="Write the details of your announcement here..."
            value={form.message}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded p-2 bg-[#f8f9fa]"
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={() => saveAnnouncement("DRAFT")}
              className="px-4 py-2 border rounded cursor-pointer"
            >
              Save as Draft
            </button>
            <button
              onClick={() => saveAnnouncement("SENT")}
              className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
            >
              Send Announcement
            </button>
          </div>
        </div>

        {/* Drafts */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-xl">Draft Announcements</h2>
          <input
            type="text"
            placeholder="Search drafts..."
            value={draftSearch}
            onChange={(e) => setDraftSearch(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          />
        </div>

        <div>
          {drafts.length === 0 && (
            <p className="text-gray-400">No drafts available</p>
          )}
         {drafts.map((a) => (
  <div key={a.id} className="bg-white border rounded p-4 mb-2">
    <div className="flex justify-between items-center">
      <div>
        <h3 className="font-medium">{a.title}</h3>
        <span className="text-sm text-gray-500">{a.createdAt}</span>
      </div>

      <button
        onClick={() => handleEditDraft(a)}
        className="text-sm border px-3 py-1 rounded flex items-center gap-1"
      >
        <span className="material-symbols-outlined text-[16px]">edit</span>
        Edit
      </button>
    </div>

    <p className="text-gray-600 text-sm mt-1">{a.message}</p>
  </div>
))}

        </div>

        {/* Past */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-xl">Past Announcements</h2>
          <input
            type="text"
            placeholder="Search past..."
            value={pastSearch}
            onChange={(e) => setPastSearch(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          />
        </div>

        <div>
          {sent.length === 0 && (
            <p className="text-gray-400">No announcements sent yet</p>
          )}
          {sent.map((a) => (
            <div key={a.id} className="bg-white border rounded p-4 mb-2">
              <div className="flex justify-between">
                <h3 className="font-medium">{a.title}</h3>
                <span className="text-sm text-gray-500">{a.createdAt}</span>
              </div>
              <p className="text-gray-600 text-sm mt-1">{a.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
