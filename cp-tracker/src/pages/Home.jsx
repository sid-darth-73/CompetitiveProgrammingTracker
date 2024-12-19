import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [username, setUsername] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      navigate(`/info?username=${username}`);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen transition-colors ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Top Bar */}
      <div className="absolute top-4 left-4 flex items-center">
        {/* Logo */}
        <img src="./images/aef6924ac82249d5.jpg" alt="Logo" className="w-12 h-12" />
      </div>
      <div className="absolute top-4 right-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="bg-gray-300 dark:bg-gray-700 p-2 rounded-full focus:outline-none"
        >
          {darkMode ? (
            <span className="text-yellow-400">Light</span>
          ) : (
            <span className="text-white">Dark</span>
          )}
        </button>
      </div>

      {/* Main Content */}
      <h3 className="text-4xl font-bold mb-6">Search for profile/username</h3>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-700 dark:text-gray-200 p-6 rounded-lg shadow-md">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="border text-black border-gray-300 dark:border-gray-700 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Home;