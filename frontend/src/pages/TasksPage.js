import { useEffect, useState } from 'react';
import api from '../services/apiService';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('createdAt');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await api.get('/tasks/tasks');
      const reversed = [...response.data].reverse();
      setTasks(reversed);
      setFilteredTasks(reversed);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setErrorMsg('Failed to load tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    const confirm = window.confirm('Are you sure you want to delete this task?');
    if (!confirm) return;

    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      setFilteredTasks((prev) => prev.filter((task) => task.id !== taskId));
      setSuccessMsg('Task deleted successfully.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Delete error:', err);
      setErrorMsg('Failed to delete task. Please try again.');
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.put(`/tasks/${taskId}/status`, null, {
        params: { status: newStatus },
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );

      setSuccessMsg('Task status updated.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Status update failed:', err);
      setErrorMsg('Failed to update task status.');
      setTimeout(() => setErrorMsg(''), 3000);
    }
  };

  useEffect(() => {
    let filtered = tasks;

    if (searchQuery.trim() !== '') {
      const lower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(lower) ||
          t.description.toLowerCase().includes(lower)
      );
    }

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }

    if (sortBy === 'dueDate') {
      filtered = [...filtered].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else {
      filtered = [...filtered].sort((a, b) => b.id - a.id);
    }

    setFilteredTasks(filtered);
  }, [searchQuery, statusFilter, tasks, sortBy]);

  const getStatusBadge = (status) => {
    const styles = {
      'NOT_STARTED': 'bg-gray-100 text-gray-700 border-gray-200',
      'IN_PROGRESS': 'bg-blue-100 text-blue-700 border-blue-200',
      'COMPLETED': 'bg-green-100 text-green-700 border-green-200'
    };
    const labels = {
      'NOT_STARTED': 'Not Started',
      'IN_PROGRESS': 'In Progress',
      'COMPLETED': 'Completed'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="sticky top-0 z-10 backdrop-blur-xl bg-white/90 border-b border-gray-200/30">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight">
            Tasks
          </h1>
          <p className="text-gray-600 mt-1 text-sm">
            Manage your tasks and stay organized
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">All Statuses</option>
                <option value="NOT_STARTED">Not Started</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
            <div className="sm:w-48">
              <select
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="createdAt">Newest First</option>
                <option value="dueDate">Sort by Due Date</option>
              </select>
            </div>
          </div>
        </div>

        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                <p className="text-gray-600 text-sm">{task.description}</p>
                <p className="text-sm text-gray-500 mt-1">Due: {new Date(task.dueDate).toLocaleString()}</p>
              </div>
              <div className="flex flex-col items-end">
                {getStatusBadge(task.status)}
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  className="mt-2 text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value="NOT_STARTED">Not Started</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;
