const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql')
require('dotenv').config()
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: 'sharkdb',
  port: process.env.PORT
})

connection.connect()

var myBook = null
const user = 0;

connection.query('SELECT * from user', (err, rows, fields) => {
  if (err) throw err
  myBook = rows
  //console.log('The solution is: ', rows)
})

myBook = JSON.parse(myBook)

app.get('/', (req, res) => {
  const name = myBook[0]
  //res.send('Hello World!')
  res.send(name.username)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
connection.end()