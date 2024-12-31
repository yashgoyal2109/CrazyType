import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
const apiurl = import.meta.env.VITE_API_URL;

function Profile() {
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const api = axios.create({
    baseURL: `${apiurl}`,
    withCredentials: true
  });

  const fetchUserResults = async (page = 1, limit = 10) => {
    const response = await api.get(`/results`, {
      params: { page, limit }
    });
    return response.data;
  };

  const fetchUserStats = async () => {
    const response = await api.get('/results/stats');
    return response.data;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [resultsData, statsData] = await Promise.all([
          fetchUserResults(page, 10),
          fetchUserStats()
        ]);
        
        setResults(resultsData.results);
        setTotalPages(resultsData.pagination.totalPages);
        setStats(statsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page]);

  if (loading) return (
    <div className="min-h-screen bg-main_bg flex items-center justify-center">
      <div className="text-text_color text-lg">Loading...</div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-main_bg flex items-center justify-center">
      <div className="text-red-500 text-lg">Error: {error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-main_bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Navbar callApi={() => window.location.href = "/"} />
        
        {stats && (
          <div className="mb-6 mt-4 sm:mt-8">
            <h2 className="text-2xl sm:text-3xl text-heading_color font-bold mb-6 text-center">Your Stats</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { label: 'Average WPM', value: Math.round(stats.averageWpm) },
                { label: 'Highest WPM', value: stats.highestWpm },
                { label: 'Tests Taken', value: stats.totalTests },
                { label: 'Avg Accuracy', value: `${Math.round(stats.averageAccuracy)}%` }
              ].map((stat, index) => (
                <div key={index} className="bg-gray-800/30 rounded-lg p-4 flex flex-col items-center justify-center">
                  <p className="text-text_color text-sm sm:text-base font-semibold mb-2">{stat.label}</p>
                  <p className="text-number_color text-xl sm:text-2xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 overflow-hidden rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-text_color text-sm sm:text-base font-semibold">Date</th>
                  <th className="px-4 py-3 text-left text-text_color text-sm sm:text-base font-semibold">WPM</th>
                  <th className="px-4 py-3 text-left text-text_color text-sm sm:text-base font-semibold">Accuracy</th>
                  <th className="px-4 py-3 text-left text-text_color text-sm sm:text-base font-semibold">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {results.map((result) => (
                  <tr 
                    key={result._id} 
                    className="hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-number_color whitespace-nowrap text-sm sm:text-base">
                      {new Date(result.completedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-number_color whitespace-nowrap text-sm sm:text-base">
                      {result.wpm}
                    </td>
                    <td className="px-4 py-3 text-number_color whitespace-nowrap text-sm sm:text-base">
                      {result.accuracy}%
                    </td>
                    <td className="px-4 py-3 text-number_color whitespace-nowrap text-sm sm:text-base">
                      {result.timeElapsed}s
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;