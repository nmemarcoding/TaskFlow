// src/components/Navbar.js
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../services/apiService';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userInfo = localStorage.getItem('userInfo');
    setIsAuthenticated(!!token);
    if (userInfo) {
      try {
        const parsed = JSON.parse(userInfo);
        setUsername(parsed.username || '');
      } catch (e) {
        console.error('Failed to parse user info from localStorage');
      }
    } else {
      setUsername('');
    }
  }, [location]);

  const handleLogout = () => {
    try {
      logout();
      setIsAuthenticated(false);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
      setError('Logout failed. Please try again.');
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-teal-600">TaskFlow</Link>

          <div className="md:hidden">
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

          <div className="hidden md:flex space-x-6 items-center">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-700">Welcome, {username}</span>
                <Link to="/tasks" className="text-gray-700 hover:text-teal-600 font-medium">Tasks</Link>
                <Link to="/tasks/create" className="text-gray-700 hover:text-teal-600 font-medium">Create Task</Link>
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
              <span className="block text-sm text-gray-700">Welcome, {username}</span>
              <Link to="/tasks" className="block text-gray-700 hover:text-teal-600">Tasks</Link>
              <Link to="/tasks/create" className="block text-gray-700 hover:text-teal-600">Create Task</Link>
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
