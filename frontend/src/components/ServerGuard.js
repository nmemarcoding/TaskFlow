import { useState, useEffect, useRef } from 'react';
import api from '../services/apiService';

const ServerGuard = ({ children }) => {
  const [status, setStatus] = useState('checking');
  const [retryCount, setRetryCount] = useState(0);
  const retryTimeoutRef = useRef(null);
  const maxRetries = 5; // Limit retries to prevent infinite loops
  const baseRetryDelay = 5000; // Base delay in ms (5 seconds)

  const checkServer = async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // Slightly shorter timeout

    try {
      await api.get('/ping', { signal: controller.signal });
      setStatus('ok');
      setRetryCount(0); // Reset retry count on success
    } catch (error) {
      if (error.name === 'AbortError') {
        console.warn('Server check timed out');
      } else {
        console.error('Server check failed:', error.message);
      }
      setStatus('fail');
    } finally {
      clearTimeout(timeout);
    }
  };

  const scheduleRetry = (delay) => {
    if (retryCount >= maxRetries) {
      setStatus('fail'); // Stop retrying after max retries
      return;
    }

    retryTimeoutRef.current = setTimeout(() => {
      setStatus('checking');
      setRetryCount((prev) => prev + 1);
      checkServer();
    }, delay);
  };

  useEffect(() => {
    checkServer(); // Initial check

    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (status === 'fail' && retryCount < maxRetries) {
      // Exponential backoff: delay = baseRetryDelay * 2^retryCount
      const delay = baseRetryDelay * Math.pow(2, retryCount);
      scheduleRetry(delay);
    }

    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [status, retryCount]);

  const handleManualRetry = () => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current); // Clear any scheduled retry
    }
    setStatus('checking');
    setRetryCount(0); // Reset retry count for manual retry
    checkServer();
  };

  if (status === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Checking server status...
      </div>
    );
  }

  if (status === 'fail') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-600 space-y-4">
        <div>
          Server unavailable.{' '}
          {retryCount < maxRetries
            ? `Retrying in ${Math.round(
                (baseRetryDelay * Math.pow(2, retryCount)) / 1000
              )} seconds...`
            : 'Max retries reached.'}
        </div>
        <button
          onClick={handleManualRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry Now
        </button>
      </div>
    );
  }

  return children;
};

export default ServerGuard;