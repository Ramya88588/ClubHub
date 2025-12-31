import { useEffect, useState } from "react";
import {
  getPendingClubRequests,
  updateClubRequest,
  createClub,
  updateUser,
} from "@/firebase/collections";

const AdminApprove = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadRequests = async () => {
    setLoading(true);
    const data = await getPendingClubRequests();
    setRequests(data);
    setLoading(false);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const approveRequest = async (req) => {
    try {
      setLoading(true);

      // 1️⃣ Create club (use uid as clubId)
      await createClub(req.uid, {
        clubName: req.clubName,
        presidentUid: req.uid,
        presidentName: req.presidentName,
        email: req.email,
        sinceYear: new Date().getFullYear(),
        aboutClub: "",
        profileImageUrl: "",
        socialLinks: {
          website: "",
          instagram: "",
          linkedin: "",
        },
        preferences: [],
        hiring: {
          isHiring: false,
          applicationFormUrl: "",
        },
      });

      // 2️⃣ Approve user
      await updateUser(req.uid, {
        isApproved: true,
      });

      // 3️⃣ Mark request approved
      await updateClubRequest(req.id, {
        status: "APPROVED",
        reviewedAt: new Date(),
        reviewedBy: "ADMIN",
      });

      alert("Club approved successfully");
      loadRequests();
    } catch (err) {
      console.error(err);
      alert("Approval failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold mb-6">Pending Club Requests</h1>

      {loading && <p>Loading...</p>}

      {!loading && requests.length === 0 && (
        <p>No pending requests 🎉</p>
      )}

      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="border rounded-md p-4 flex justify-between items-center"
          >
            <div>
              <p><strong>Club:</strong> {req.clubName}</p>
              <p><strong>President:</strong> {req.presidentName}</p>
              <p><strong>Email:</strong> {req.email}</p>
            </div>

            <button
              disabled={loading}
              onClick={() => approveRequest(req)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Approve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminApprove;
