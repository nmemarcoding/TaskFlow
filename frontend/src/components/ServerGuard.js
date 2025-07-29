import { useState, useEffect } from 'react';
import api from '../services/apiService';

const ServerGuard = ({ children }) => {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    const checkServer = async () => {
      try {
        await api.get('/ping');
        setStatus('ok');
      } catch {
        setStatus('fail');
      }
    };

    checkServer();
  }, []);

  if (status === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Checking server status...
      </div>
    );
  }

  if (status === 'fail') {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Server unavailable. Please try again later.
      </div>
    );
  }

  return children;
};

export default ServerGuard;
