import { useState, useEffect, useRef } from 'react';
import api from '../services/apiService';

const ServerGuard = ({ children }) => {
  const [status, setStatus] = useState('checking');
  const retryTimeoutRef = useRef(null);

  const checkServer = async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      await api.get('/ping', { signal: controller.signal });
      setStatus('ok');
    } catch {
      setStatus('fail');
    } finally {
      clearTimeout(timeout);
    }
  };

  useEffect(() => {
    checkServer();

    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (status === 'fail') {
      retryTimeoutRef.current = setTimeout(() => {
        setStatus('checking');
        checkServer();
      }, 10000);
    }

    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [status]);

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
        Server unavailable. Retrying in 10 seconds...
      </div>
    );
  }

  return children;
};

export default ServerGuard;
