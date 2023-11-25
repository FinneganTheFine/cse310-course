import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/api/data');
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {data.map(row => (
        <div key={row.UID}>  
          <p>Name: {row.username}</p> 
          <p>Email: {row.email}</p>
        </div>
      ))}
    </div>
  );
}

export default App;