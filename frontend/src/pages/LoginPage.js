// src/pages/LoginPage.js
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/apiService';

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg('Both fields are required.');
      return;
    }

    const payload = { email, password };

    try {
      const response = await api.post('/login', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      const token = response.headers['authorization'];

      if (token) {
        localStorage.setItem('authToken', token);
        navigate('/tasks');
      } else {
        setErrorMsg('Login failed. No token received.');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setErrorMsg('Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-teal-200 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 sm:p-10">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-teal-600">Welcome Back</h1>
          <p className="text-sm text-gray-500 mt-2">Sign in to your TaskFlow account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded-xl font-semibold hover:bg-teal-600 transition duration-200"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-teal-600 hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
