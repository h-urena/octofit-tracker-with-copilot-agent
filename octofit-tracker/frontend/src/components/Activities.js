import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
      const apiUrl = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
        : 'http://localhost:8000/api/activities/';

      console.log('Fetching activities from:', apiUrl);

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const activitiesData = data.results || data;
        console.log('Fetched activities data:', activitiesData);
        setActivities(activitiesData);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div className="container mt-4"><p>Loading activities...</p></div>;
  if (error) return <div className="container mt-4"><p>Error: {error}</p></div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Activities</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>User</th>
            <th>Type</th>
            <th>Duration (minutes)</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={index}>
              <td>{activity.user}</td>
              <td>{activity.type}</td>
              <td>{activity.duration}</td>
              <td>{activity.team}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Activities;