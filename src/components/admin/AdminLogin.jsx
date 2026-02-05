import { useState, useEffect } from "react";
import { API_BASE } from "../../config/api";
import { setToken } from "../../lib/auth";
import "./Admin.css";

export default function AdminLogin({ onLogin }) {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [signupAllowed, setSignupAllowed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE}/api/auth/signup-allowed`)
      .then((res) => res.json())
      .then((data) => { if (!cancelled) setSignupAllowed(data.allowed === true); })
      .catch(() => { if (!cancelled) setSignupAllowed(false); })
      .finally(() => { if (!cancelled) setChecking(false); });
    return () => { cancelled = true; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Email and password are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const endpoint = mode === "signup" ? "/api/auth/signup" : "/api/auth/login";
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Request failed");
        setLoading(false);
        return;
      }

      if (data.token) {
        setToken(data.token);
        onLogin();
      } else {
        setError("No token received");
      }
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">Loading…</div>
      </div>
    );
  }

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <h1>Portfolio Admin</h1>
        <p className="admin-login-subtitle">
          Authorized access only — site maintainer. {mode === "signup" ? "Create your account." : "Sign in to manage projects and content."}
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={loading}
          />
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={mode === "signup" ? "At least 6 characters" : "Your password"}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            disabled={loading}
          />
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
            {loading ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}
          </button>
        </form>
        {signupAllowed ? (
          <button
            type="button"
            className="admin-link-button"
            onClick={() => { setMode(mode === "signup" ? "login" : "signup"); setError(""); }}
          >
            {mode === "signup" ? "Already have an account? Sign in" : "First time? Create account"}
          </button>
        ) : (
          <p className="admin-login-hint">Already have an account? Use Sign in above.</p>
        )}
        <a href="/" className="admin-back-link">← Back to portfolio</a>
      </div>
    </div>
  );
}
