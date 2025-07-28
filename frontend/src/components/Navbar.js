// src/components/Navbar.js
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../services/apiService';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, [location]); // updates when route changes (e.g. after login/logout)

  const handleLogout = () => {
    try {
      logout();
      setIsAuthenticated(false);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
      setError('Failed to log out. Please try again.');
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-teal-600">
            TaskFlow
          </Link>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 hover:text-teal-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          <div className="hidden md:flex space-x-6">
            {isAuthenticated ? (
              <>
                <Link to="/tasks" className="text-gray-700 hover:text-teal-600 font-medium">Tasks</Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-teal-600 font-medium">Login</Link>
                <Link to="/register" className="text-gray-700 hover:text-teal-600 font-medium">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white shadow-md border-t border-gray-100">
          {isAuthenticated ? (
            <>
              <Link to="/tasks" className="block text-gray-700 hover:text-teal-600">Tasks</Link>
              <button
                onClick={handleLogout}
                className="block text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-gray-700 hover:text-teal-600">Login</Link>
              <Link to="/register" className="block text-gray-700 hover:text-teal-600">Register</Link>
            </>
          )}
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 text-sm text-center">
          {error}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
