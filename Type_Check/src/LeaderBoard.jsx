import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:3000/leaderboard', { withCredentials: true })
        .then(response => setLeaderboard(response.data))
        .catch(error => console.error(error));
    }, []);
  
    return (
      <div className="p-8 bg-main_bg h-screen">
        <Navbar />
        <div className="text-heading_color font-bold text-2xl flex items-center justify-center p-10">
            LeaderBoard
        </div>
        <table className="w-full text-text_color">
          <thead>
            <tr className="text-number_color">
              <th>Rank</th>
              <th>Username</th>
              <th>Avg WPM</th>
              <th>Accuracy</th>
              <th>Tests</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <tr key={user._id} className="text-center">
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.avgWpm.toFixed(1)}</td>
                <td>{user.avgAccuracy.toFixed(1)}%</td>
                <td>{user.totalTests}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  export default Leaderboard;