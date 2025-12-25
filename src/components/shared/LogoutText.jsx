import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/firebase/auth";

const LogoutText = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();   // Firebase logout
      navigate("/");        // 🔴 landing page (not /login)
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <span
      onClick={handleLogout}
      className="cursor-pointer text-red-500 hover:text-red-700"
    >
      Logout
    </span>
  );
};

export default LogoutText;
