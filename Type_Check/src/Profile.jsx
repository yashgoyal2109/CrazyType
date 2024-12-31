import { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const api = axios.create({
    baseURL: 'http://localhost:3000',
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
        // Fetch results and stats in parallel
        const [resultsData, statsData] = await Promise.all([
          fetchUserResults(page, 10),
          fetchUserStats()
        ]);
        
        setResults(resultsData.results);
        setTotalPages(resultsData.pagination.totalPages);
        setStats(statsData);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 bg-main_bg h-screen">
      {stats && (
        <div className="mb-6 p-4 rounded">
          <h2 className="text-3xl text-heading_color font-bold mb-3">Your Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-10">
            <div className='flex flex-col items-center justify-center'>
              <p className="font-semibold text-text_color">Average WPM</p>
              <p className='text-number_color'>{Math.round(stats.averageWpm)}</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <p className="font-semibold text-text_color">Highest WPM</p>
              <p className='text-number_color'>{stats.highestWpm}</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <p className="font-semibold text-text_color">Tests Taken</p>
              <p className='text-number_color'>{stats.totalTests}</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <p className="font-semibold text-text_color">Avg Accuracy</p>
              <p className='text-number_color'>{Math.round(stats.averageAccuracy)}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className='text-text_color'>
              <th className="">Date</th>
              <th className="px-4 py-2">WPM</th>
              <th className="px-4 py-2">Accuracy</th>
              <th className="px-4 py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result._id} className='text-center text-number_color'>
                <td className="py-2">
                  {new Date(result.completedAt).toLocaleDateString()}
                </td>
                <td>{result.wpm}</td>
                <td>{result.accuracy}%</td>
                <td>{result.timeElapsed}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>
  );
}

export default Profile;