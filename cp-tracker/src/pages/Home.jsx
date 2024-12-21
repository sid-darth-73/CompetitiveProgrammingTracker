import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [username, setUsername] = useState('');
  const [platforms, setPlatforms] = useState({ codeforces: false, codechef: false });
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    setPlatforms({
      ...platforms,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && (platforms.codeforces || platforms.codechef)) {
      const selectedPlatforms = Object.keys(platforms).filter((key) => platforms[key]);
      navigate(`/info?username=${username}&platforms=${selectedPlatforms.join(',')}`);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen transition-colors ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="absolute top-4 left-4 flex items-center">
        <img src="./images/aef6924ac82249d5.jpg" alt="Logo" className="w-12 h-12" />
      </div>
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleDarkMode}
          className="bg-gray-300 dark:bg-gray-700 p-2 rounded-full focus:outline-none"
        >
          {darkMode ? <span className="text-yellow-400">Light</span> : <span className="text-white">Dark</span>}
        </button>
      </div>
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
        <div className="mb-4">
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              name="codeforces"
              checked={platforms.codeforces}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            Codeforces
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="codechef"
              checked={platforms.codechef}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            CodeChef
          </label>
        </div>
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