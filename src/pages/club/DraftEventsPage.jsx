import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebase";
import { getClubUpcomingEvents } from "@/firebase/collections";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import ClubEventCard from "@/components/shared/clubEventCard";
import Navbar from "@/components/layout/DashboardC/Navbar";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Loader from "@/components/shared/Loader";

const DraftEventsPage = () => {
  const [draftEvents, setDraftEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const clubId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchEvents = async () => {
      if (!clubId) return;

      setLoading(true);

      // 🔹 Draft events
      const draftQuery = query(
        collection(db, "events"),
        where("clubId", "==", clubId),
        where("status", "==", "draft")
      );

      const draftSnap = await getDocs(draftQuery);
      const drafts = draftSnap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      // 🔹 Upcoming events (reuse your helper)
      const upcoming = await getClubUpcomingEvents(clubId);

      setDraftEvents(drafts);
      setUpcomingEvents(upcoming);
      setLoading(false);
    };

    fetchEvents();
  }, [clubId]);
  if (loading) {
    return <Loader message="Loading your events…" />;
  }
  return (
    <div>
      <Navbar />

      <div className="mt-15 p-16 bg-[#f8f9fa] min-h-screen space-y-10">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* HEADER */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Draft & Upcoming Events
              </h1>
              <p className="text-sm text-gray-500">
                Manage draft events and track upcoming ones
              </p>
            </div>

            {/* CREATE EVENT BUTTON */}
            <Link to="/club/create-event">
              <div
                className="flex items-center gap-3 px-6 py-3 bg-white border rounded-lg shadow-sm
                    hover:border-yellow-400 hover:shadow transition cursor-pointer"
              >
                <Plus size={22} className="text-yellow-500" />
                <span className="font-medium text-sm">Create New Event</span>
              </div>
            </Link>
          </div>

          {/* DRAFT EVENTS */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Draft Events
            </h2>

            {draftEvents.length === 0 ? (
              <div className="bg-white border rounded-lg p-6 text-gray-500">
                No draft events yet
              </div>
            ) : (
              <div className="flex flex-wrap gap-6">
                {draftEvents.map((event) => (
                  <ClubEventCard key={event.id} {...event} status="draft" />
                ))}
              </div>
            )}
          </section>

          {/* UPCOMING EVENTS */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Upcoming Events
            </h2>

            {upcomingEvents.length === 0 ? (
              <div className="bg-white border rounded-lg p-6 text-gray-500">
                No upcoming events
              </div>
            ) : (
              <div className="flex flex-wrap gap-6">
                {upcomingEvents.map((event) => (
                  <ClubEventCard key={event.id} {...event} status="upcoming" />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default DraftEventsPage;
