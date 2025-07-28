// src/pages/RegisterPage.js
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/apiService';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Submit handler with form validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check required fields
    if (!username || !email || !password || !confirmPassword) {
      setErrorMsg('All fields are required.');
      return;
    }

    // Check password match
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setErrorMsg('');

    const payload = {
      username,
      email,
      password,
    };

    try {
      await api.post('/register', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      setSuccessMsg('Registration successful. Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      console.error('Registration failed:', err);
      setErrorMsg('Registration failed. Please try again.');
      setSuccessMsg('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-teal-200 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 sm:p-10">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-teal-600">Create Account</h1>
          <p className="text-sm text-gray-500 mt-2">Sign up for TaskFlow</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-400 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-400 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-400 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-400 focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
          {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}

          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded-xl font-semibold hover:bg-teal-600 transition duration-200"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-600 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
