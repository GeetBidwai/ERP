import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import api from "../services/api";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("session/")
      .then((response) => {
        console.log("Session Response:", response.data);

        if (response.data.authenticated) {
          setUser(response.data);
        } else {
          setUser(null);
        }
      })
      .catch((error) => {
        console.error("Session Error:", error);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const value = {
    user,
    setUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}