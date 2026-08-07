import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

import api from "../api/api";
import {
  getAccessToken,
  clearTokens,
} from "../services/tokenService";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreUser() {
      const token = getAccessToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("me/");

        setUser(response.data);
      } catch (error) {
        clearTokens();
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    restoreUser();
  }, []);

  function logout() {
    clearTokens();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}