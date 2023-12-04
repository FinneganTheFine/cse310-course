const express = require('express')
const app = express()
app.use(express.json()); 
app.use(express.urlencoded({extended: false}));
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

app.get('/', (req, res) => {
  db.query('SELECT * FROM user', (error, results) => {
    if (error) throw error;

    let data = '<table>';
    results.forEach(row => {
      data += `
        <tr>
          <td>${row.UID}</td>
          <td>${row.username}</td>
          <td>${row.email}</td>
        </tr>
      `; 
    });
    data += '</table>';

    res.send(`
      <h1>Current Data</h1>
      ${data}

      <h1>Insert Data</h1>
      <form method="POST" action="/insert">
        <input type="text" name="name" placeholder="Name" required>
        <input type="email" name="email" placeholder="Email" required>
        <input type="text" name="password" placeholder="Password" required>
        <button type="submit">Insert</button>
      </form>

      <h1>Update Data</h1>
      <form method="POST" action="/update">
        <input type="number" name="id" placeholder="ID" required> 
        <input type="text" name="name" placeholder="Name">
        <input type="email" name="email" placeholder="Email">
        <button type="submit">Update</button>
      </form>

      <h1>Delete Data</h1>  
      <form method="POST" action="/delete">
        <input type="number" name="id" placeholder="ID" required>
        <button type="submit">Delete</button>
      </form>

      <h1>New Lendee</h1>
      <form method="POST" action="/lendee">
        <input type="text" name="name" placeholder="Lendee Name" required>
        <input type="number" name="amount" placeholder="Amount Lent" required>
        <input type="date" name="due" placeholder="Date Lent" required>
        <input type="date" name="given" placeholder="Date Due" required>
        <input type="number" name="phone" placeholder="Lendee Phone" required>
        <input type="number" name="rating" placeholder="Lendee Rating" required>
        <input type="number" name="lender" placeholder="Lender" required>
        <button type="submit">New Lend</button>
      </form>
    `);
  });
});

// Route to insert data
app.post('/insert', (req, res) => {
  const { name, email, password} = req.body;
  //console.log(name)
  db.query('INSERT INTO user (username, email, password) VALUES (?, ?, ?)', [name, email, password], error => {
    if (error) throw error;
    res.redirect('/');
  });
});

// Route to update data
app.post('/update', (req, res) => {
  const { id, name, email } = req.body;

  db.query('UPDATE user SET username = ?, email = ? WHERE UID = ?', [name, email, parseInt(id)], error => {
    if (error) throw error;
    res.redirect('/');
  });
});

// Route to delete data
app.post('/delete', (req, res) => {
  const { id } = req.body;

  db.query('DELETE FROM user WHERE UID = ?', [parseInt(id)], error => {
    if (error) throw error;
    res.redirect('/');
  });
});

app.post('/lendee', (req, res) => {
  const {name, amount, due, given, phone, rating, lender} = req.body;

  db.query('INSERT INTO lendee_table (Lendee_Name, Lend_Amount, Lend_Due, Lend_Given, Lendee_Phone, Lendee_Rating, Lender) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, amount, due, given, phone, rating, lender], error => {
    if (error) throw error;
    res.redirect('/');
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000'); 
});