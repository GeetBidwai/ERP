import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import api, { initializeCSRF } from "../../services/api";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { user, loading, setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate("/select-business", { replace: true });
    }
  }, [loading, navigate, user]);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      // Get CSRF cookie first
      await initializeCSRF();

      // Login
      await api.post("login/", {
        username,
        password,
      });

      // Verify session
      const response = await api.get("session/");

      if (response.data.authenticated) {
        setUser(response.data);
      }

      navigate("/select-business", { replace: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }  


  if (loading) {
    return <p>Loading...</p>;
  }

  if (user) {
    return null;
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-heading">
          <p>Family ERP</p>
          <h1 id="login-title">Welcome back</h1>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>

        <a
          className="forgot-password"
          href="#"
          onClick={(event) => event.preventDefault()}
        >
          Forgot Password?
        </a>
      </section>
    </main>
  );
}
