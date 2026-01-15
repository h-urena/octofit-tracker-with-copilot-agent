import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
      const apiUrl = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
        : 'http://localhost:8000/api/teams/';

      console.log('Fetching teams from:', apiUrl);

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const teamsData = data.results || data;
        console.log('Fetched teams data:', teamsData);
        setTeams(teamsData);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div className="container mt-4"><p>Loading teams...</p></div>;
  if (error) return <div className="container mt-4"><p>Error: {error}</p></div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Teams</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Team Name</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={index}>
              <td>{team.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teams;