import React, { useState, useEffect } from 'react';
import mysql from 'mysql';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'mydb'
    });

    connection.connect();

    connection.query('SELECT * FROM mytable', (error, results) => {
      if (error) throw error;
      setData(results);
    });

    connection.end();
  }, []);

  return (
    <div>
      {data && data.map(row => (
        <div key={row.id}>{row.name}</div>
      ))}
    </div>
  );
}

export default App;
