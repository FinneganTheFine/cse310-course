const express = require('express')
const cors = require('cors');
const app = express()
app.use(express.json()); 
app.use(express.urlencoded({extended: false}));
app.use(cors());
const port = 3000
const mysql = require('mysql')
require('dotenv').config()
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: 'sharkdb',
  port: process.env.PORT
})
//Get data
app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM user', (error, results) => {
    if (error) throw error;
    
    res.json(results);  
  });
});
//Insert data
app.post('/api/data', (req, res) => {
  const { name, email, password } = req.body;

  db.query('INSERT INTO user SET ?', { 
    username: name, 
    email: email,
    password: password
  }, (error, results) => {
    if (error) throw error;
    
    res.json({message: 'Data inserted'});
  })
});
//remove html
app.get('/', (req, res) => {
  // Just call the API route
  res.redirect('/api/data'); 
});