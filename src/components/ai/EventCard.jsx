export default function EventCard({ event }) {
  const title = event?.title ?? "Untitled Event";
  const club = event?.club ?? "Unknown Club";

  const date =
    typeof event?.date === "string"
      ? event.date
      : event?.date?.start
      ? `${event.date.start} → ${event.date.end ?? ""}`
      : "Date not available";

  const time =
    typeof event?.time === "string"
      ? event.time
      : event?.time?.start
      ? `${event.time.start} – ${event.time.end ?? ""}`
      : "Time not available";

  return (
    <div className="border rounded-xl px-3 py-2 bg-white shadow-sm max-w-[80%]">
      <div className="font-medium text-sm text-gray-900">{title}</div>

      <div className="text-xs text-gray-600">
        {date} · {time}
      </div>

      <div className="text-xs text-gray-500">{club}</div>
    </div>
  );
}
