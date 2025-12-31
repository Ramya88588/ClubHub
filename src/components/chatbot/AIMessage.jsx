import EventCard from "./EventCard";
import FollowUpButtons from "./FollowUpButtons";
import { getAIEventContext } from "../../firebase/aiContext";

const genKey = () =>
  crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);

export default function AIMessage({ data, onFollowUpClick }) {
  const { text, events = [], notes = [], followUps = [] } = data;

  const allEvents = getAIEventContext();
  const eventArray = Array.isArray(allEvents) ? allEvents : [];

  const resolvedEvents = events
    .map((e) =>
      typeof e === "string" ? eventArray.find((ev) => ev.id === e) : e
    )
    .filter(Boolean);

  return (
    <div className="space-y-3 max-w-full">
      <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-xl text-sm max-w-[80%]">
        {text}
      </div>

      {resolvedEvents.length > 0 && (
        <div className="space-y-2">
          {resolvedEvents.map((event) => (
            <EventCard key={genKey()} event={event} />
          ))}
        </div>
      )}

      {notes.length > 0 && (
        <div className="text-xs bg-amber-50 text-amber-700 px-3 py-2 rounded-lg max-w-[80%]">
          {notes.map((note, i) => (
            <div key={`${note}-${i}`}>{note}</div>
          ))}
        </div>
      )}

      {followUps.length > 0 && (
        <FollowUpButtons items={followUps} onClick={onFollowUpClick} />
      )}
    </div>
  );
}
