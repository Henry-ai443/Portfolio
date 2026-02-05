import { useState, useEffect } from "react";
import AdminLogin from "../components/admin/AdminLogin";
import AdminDashboard from "../components/admin/AdminDashboard";
import { getToken, clearToken, validateToken } from "../lib/auth";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!getToken()) {
        setAuthenticated(false);
        setChecking(false);
        return;
      }
      const valid = await validateToken();
      if (!cancelled) setAuthenticated(valid);
      setChecking(false);
    })();
    return () => { cancelled = true; };
  }, []);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    clearToken();
    setAuthenticated(false);
  };

  if (checking) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">Checking…</div>
      </div>
    );
  }

  if (authenticated) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return <AdminLogin onLogin={handleLogin} />;
}
