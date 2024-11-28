import React, { useState } from 'react';
import axios from 'axios';

function ChecklistDashboard() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const fetchResults = async () => {
    try {
      const response = await axios.post('/process-checklist', {
        checklist: ['Valuation Fee Paid', 'UK Resident', 'Risk Rating Medium', 'LTV Below 60%'],
      });
      setResults(response.data.results);
      setError(null); 
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    }
  };
  
  const retryFetch = () => {
    setError(null); 
    fetchResults(); 
  };
  
  

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary">Checklist Dashboard</h1>
      <button className="btn btn-primary mb-4" onClick={fetchResults}>
        Fetch Results
      </button>
  
      {error && <div className="alert alert-danger">{error}</div>}
  
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Checklist Item</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {results.map(result => (
            <tr key={result.item}>
              <td>{result.item}</td>
              <td
                className={
                  result.status === 'Passed'
                    ? 'text-success font-weight-bold'
                    : 'text-danger font-weight-bold'
                }
              >
                {result.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}

export default ChecklistDashboard;
