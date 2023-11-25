// Frontend React App

import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => setData(data.message));
  }, []);

  return <h1>{data}</h1>;
}

export default App;
