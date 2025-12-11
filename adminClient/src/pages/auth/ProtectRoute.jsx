import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children })=> {
  const { admin, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl">
        Checking authentication...
      </div>
    );
  }
  if (admin) {
    return children;
  }
  return <Navigate to="/login" replace />;
}

export default ProtectedRoute;