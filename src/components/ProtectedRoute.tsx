import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: React.ReactNode;
  role?: "USER" | "ADMIN";
}

function ProtectedRoute({ children, role }: Props) {
  const { user, token } = useAuth();


  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;