import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex flex-col items-center justify-center px-4 py-10 text-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-4">
          Welcome to TaskFlow
        </h1>
        <p className="text-gray-600 text-sm md:text-base mb-6">
          Manage your tasks, stay organized, and be more productive. Create, track, and update your workflow with ease.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
          <Link
            to="/tasks"
            className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
          >
            View Tasks
          </Link>
          <Link
            to="/tasks/create"
            className="w-full sm:w-auto px-6 py-3 bg-white text-blue-500 border border-blue-500 font-semibold rounded-lg shadow hover:bg-blue-50 transition"
          >
            Create Task
          </Link>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-8">
        &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
      </p>
    </div>
  );
};

export default HomePage;
