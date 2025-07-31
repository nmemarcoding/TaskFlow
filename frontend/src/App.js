import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TasksPage from './pages/TasksPage';
import ProtectedRoute from './components/ProtectedRoute';
import CreateTaskPage from './pages/CreateTaskPage';
import HomePage from './pages/HomePage';
import api from './services/apiService';

function App() {
  const [serverRunning, setServerRunning] = useState(null); // null = checking, true = running, false = not running

  useEffect(() => {
    const checkServer = async () => {
      try {
        await api.get('/ping');
        setServerRunning(true);
      } catch (error) {
        console.error('Server check failed:', error.message);
        setServerRunning(false);
      }
    };
    checkServer();
  }, []);

  if (serverRunning === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Checking server status...
      </div>
    );
  }

  if (!serverRunning) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Server is unavailable. Please try refreshing the page.
      </div>
    );
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks/create"
          element={
            <ProtectedRoute>
              <CreateTaskPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;