import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const userId = localStorage.getItem("userName");

  if (!userId) {
    return <Navigate to="/" replace />;
  }

  return children;
}