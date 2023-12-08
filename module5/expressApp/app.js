// Imports
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config()

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
//Get Users
app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM user', (error, results) => {
    if (error) {
      return res.status(500).json({error});
    }
    res.json(results);
  });
});
//New User
app.post('/api/data', (req, res) => {
  const { name, email, password } = req.body;
  db.query('INSERT INTO user (username, email, password) VALUES (?, ?, ?)', [
    name, 
    email, 
    password
  ], (error, results) => {
    if (error) {
      return res.status(500).json({error});
    } 
    res.json({message: 'Data inserted'})
  });
});
//Update User Data
app.post('/api/updateuser', (req, res) => {
  const { id, name, email } = req.body;
  db.query('UPDATE user SET username = ?, email = ? WHERE UID = ?', [
    name,
    email, 
    parseInt(id)
  ], (error, results) => {
    if (error) {
      return res.status(500).json({error});
    } 
    res.json({message: 'Data Updated'})
  });
});

// Delete User
app.post('/api/deleteuser', (req, res) => {

  const {id} = req.body;

  // // Validate
  // if(id === undefined) {
  //   return res.status(400).send(id);
  // }

  // // Use parseInt to convert to number
  // const userId = parseInt(id); 
  
  // // Handle invalid user id  
  // if (isNaN(userId)) {
  //   return res.status(400).send('Invalid user id');
  // }

  db.query('DELETE FROM user WHERE UID = ?', [id], (error, results) => {
    if (error) {
      return res.status(500).json(error); 
    }

    res.json(results)

  });
});
//Get Lendees
app.get('/api/lendee', (req, res) => {
  db.query('SELECT * FROM lendee_table', (error, results) => {
    if (error) {
      return res.status(500).json({error});
    }
    res.json(results);
  });
});
//New Lendee
app.post('/api/lendee', (req, res) => {
  const { lend_name, amount, due, given, phone, rating, lender } = req.body;
  db.query('INSERT INTO lendee_table (Lendee_Name, Lend_Amount, Lend_Due, Lend_Given, Lendee_Phone, Lendee_Rating, Lender) VALUES (?, ?, ?, ?, ?, ?, ?)', [
    lend_name, 
    amount,
    due,
    given,
    phone,
    rating,
    lender
  ], (error, results) => {
    if (error) {
      return res.status(500).json({error});
    } 
    res.json({message: 'Data inserted'})
  });
});
//Update Lendee Data
app.post('/update', (req, res) => {
  const { id, name, email } = req.body;
  db.query('UPDATE user SET username = ?, email = ? WHERE UID = ?', [
    name,
    email, 
    parseInt(id)
  ], (error, results) => {
    if (error) {
      return res.status(500).json({error});
    } 
    res.json({message: 'Data Updated'})
  });
});

//Delete Lendee
app.post('/delete', (req, res) => {
  const { id } = req.body;
  db.query('DELETE FROM user WHERE UID = ?', [
    parseInt(id)
  ], (error, results) => {
    if (error) {
      return res.status(500).json({error});
    } 
    res.json({message: 'Data Deleted'})
  });
});

// Listen
const port = 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});