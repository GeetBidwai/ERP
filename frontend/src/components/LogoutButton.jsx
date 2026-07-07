import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import api from "../services/api";

export default function LogoutButton() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  function handleLogout() {
    api
      .post("/api/logout/")
      .then(() => {
        setUser(null);
        navigate("/login", { replace: true });
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  }

  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );
}
