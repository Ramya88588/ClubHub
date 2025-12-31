import { logoutUser } from "@/firebase/auth";
import { useNavigate } from "react-router-dom";

const WaitingApproval = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-xl font-semibold">
        Your club is waiting for approval
      </h1>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default WaitingApproval;
