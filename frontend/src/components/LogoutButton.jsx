import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { clearTokens } from "../services/tokenService";

export default function LogoutButton() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  function handleLogout() {
    clearTokens();

    setUser(null);

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );
}