// Imports
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Setup
const app = express();
app.use(express.json());
app.use(cors());

// DB Connection
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,  
  database: 'sharkdb'
});

// APIs
app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM user', (error, results) => {
    if (error) {
      return res.status(500).json({error});
    }
    res.json(results);
  });
});

app.post('/api/data', (req, res) => {
  const { name, email, password } = req.body;
  db.query('INSERT INTO user SET ?', {
    username: name, 
    email: email,
    password: password  
  }, (error, results) => {
    if (error) {
      return res.status(500).json({error});
    } 
    res.json({message: 'Data inserted'})
  });
});

// Listen
app.listen(3000, () => {
  console.log('Server running on port 3000');
});