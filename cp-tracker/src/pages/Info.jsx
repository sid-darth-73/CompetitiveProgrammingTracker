import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Info = () => {
  const [searchParams] = useSearchParams();
  const username = searchParams.get('username');
  const platforms = searchParams.get('platforms')?.split(',') || [];//
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if(platforms.includes('codeforces')) {
        try {
          setLoading(true);
          const response = await fetch(
            `https://codeforces.com/api/user.info?handles=${username}`
          );

          if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
          }

          const result = await response.json();

          if (result.status !== 'OK') {
            throw new Error(`API response status: ${result.status}`);
          }

          setData(result.result);

          const ratings = result.result.map((user) => user.rating);
          
        } catch (error) {
          console.error('Error fetching data:', error.message);
        } finally {
          setLoading(false);
        }
      } else if(platforms.includes('codechef')) {
        try {
          setLoading(true);
          const response = await fetch(
            `https://codechef-api.vercel.app/${username}`
          );

          if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
          }

          const result = await response.json();

          if (result.status !== 'Success') {
            throw new Error(`API response status: ${result.status}`);
          }

          setData(result);

          const ratings = result.content.rating;
          
        } catch (error) {
          console.error('Error fetching data:', error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">No data found for this username.</p>
      </div>
    );
  }
  if(platforms.includes('codeforces')) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">
          Data for <span className="text-blue-500">{username}</span>
        </h3>
        <div className="bg-white shadow-md rounded-lg p-6">
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            {/* {JSON.stringify(data, null, 2)} */}
            {data.map((user) => (
              <div key={user.handle}>
                <h4 className="text-xl font-bold text-gray-800 mb-2">{user.handle}</h4>
                <p className="text-gray-600 mb-2">Last Name: {user.lastName}</p>
                <p className="text-gray-600 mb-2">Rating: {user.rating}</p>
                <p className="text-gray-600 mb-2">Max Rating: {user.maxRating}</p>
                <p className="text-gray-600 mb-2">Rank: {user.rank}</p>
                <p className="text-gray-600 mb-2">Max Rank: {user.maxRank}</p>
              </div>
            ))}
          </pre>
        </div>
      </div>
    );
  }else {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">
          Data for <span className="text-blue-500">{username}</span>
        </h3>
        <div className="bg-white shadow-md rounded-lg p-6">
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            {JSON.stringify(data, null, 2)} 
            {/* just try to get JSON for codechef api, if success then extract other data from it */}
            {/* {data.map((user) => (
              <div key={user.handle}>
                <h4 className="text-xl font-bold text-gray-800 mb-2">{user.handle}</h4>
                <p className="text-gray-600 mb-2">Rating: {user.rating}</p>
                <p className="text-gray-600 mb-2">Max Rating: {user.maxRating}</p>
                <p className="text-gray-600 mb-2">Rank: {user.rank}</p>
                <p className="text-gray-600 mb-2">Max Rank: {user.maxRank}</p>
              </div>
            ))} */}
          </pre>
        </div>
      </div>
    );
  }
};

export default Info;