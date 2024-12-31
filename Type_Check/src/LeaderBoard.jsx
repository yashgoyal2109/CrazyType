import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
const apiurl = import.meta.env.VITE_API_URL;

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    axios.get(`${apiurl}/leaderboard`, { withCredentials: true })
      .then(response => setLeaderboard(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="min-h-screen bg-main_bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Navbar />
        <h1 className="text-heading_color font-bold text-xl sm:text-2xl text-center my-6 sm:my-10">
          LeaderBoard
        </h1>
        
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-number_color text-sm sm:text-base font-semibold">Rank</th>
                <th className="px-4 py-3 text-left text-number_color text-sm sm:text-base font-semibold">Username</th>
                <th className="px-4 py-3 text-left text-number_color text-sm sm:text-base font-semibold">WPM</th>
                <th className="px-4 py-3 text-left text-number_color text-sm sm:text-base font-semibold">Accuracy</th>
                <th className="px-4 py-3 text-left text-number_color text-sm sm:text-base font-semibold">Tests</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {leaderboard.map((user, index) => (
                <tr 
                  key={user._id} 
                  className={`hover:bg-gray-800/50 transition-colors ${
                    index % 2 === 0 ? 'bg-gray-900/30' : 'bg-gray-900/10'
                  }`}
                >
                  <td className="px-4 py-3 text-text_color whitespace-nowrap text-sm sm:text-base">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-text_color whitespace-nowrap text-sm sm:text-base">
                    {user.username}
                  </td>
                  <td className="px-4 py-3 text-text_color whitespace-nowrap text-sm sm:text-base">
                    {user.avgWpm.toFixed(1)}
                  </td>
                  <td className="px-4 py-3 text-text_color whitespace-nowrap text-sm sm:text-base">
                    {user.avgAccuracy.toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 text-text_color whitespace-nowrap text-sm sm:text-base">
                    {user.totalTests}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;