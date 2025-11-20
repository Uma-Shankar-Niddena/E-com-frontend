import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("https://e-com-backend-5dfi.onrender.com/auth/check", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        setLoggedIn(data.loggedIn);
      } catch (error) {
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!loggedIn) return <Navigate to="/login" replace />;

  return children;
}
