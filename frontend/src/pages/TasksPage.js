import { useEffect, useState } from 'react';
import api from '../services/apiService';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get('/tasks/tasks');
        setTasks(response.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setErrorMsg('Failed to load tasks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        <h1 className="text-3xl font-extrabold text-blue-600 text-center mb-6">Your Tasks</h1>

        {loading && (
          <p className="text-center text-gray-600">Loading tasks...</p>
        )}

        {errorMsg && (
          <p className="text-center text-red-500">{errorMsg}</p>
        )}

        {!loading && !errorMsg && tasks.length === 0 && (
          <p className="text-center text-gray-500">You have no tasks assigned.</p>
        )}

        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow transition">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-gray-800">{task.title}</h2>
                <span
                  className={`text-sm font-medium px-2 py-1 rounded-full
                    ${task.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                      task.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                      'bg-gray-200 text-gray-700'}`}
                >
                  {task.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{task.description}</p>
              <div className="text-xs text-gray-500">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TasksPage;
