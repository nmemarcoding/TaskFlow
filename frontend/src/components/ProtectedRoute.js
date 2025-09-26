// src/components/ProtectedRoute.js
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { validateToken } from '../services/apiService';

const ProtectedRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null); // null = loading

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await validateToken();
      setAuthorized(isValid);
    };
    checkAuth();
  }, []);

  if (authorized === null) {
    return <div className="p-4 text-center text-gray-600">Checking authentication...</div>;
  }

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
