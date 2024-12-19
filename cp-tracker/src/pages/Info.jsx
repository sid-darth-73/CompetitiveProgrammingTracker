import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Info = () => {
  const [searchParams] = useSearchParams();
  const username = searchParams.get('username');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call APIs and fetch data here
        const fetchedData = await Promise.all([
          // Fetch from Codeforces, LeetCode, and CodeChef APIs
        ]);
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Data for <span className="text-blue-500">{username}</span>
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default Info;