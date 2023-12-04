import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [lenders, setData] = useState([]);
  const [lendee, setLendeeClass] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lend_name, setLendee] = useState('');
  const [amount, setAmount] = useState('');
  const [due, setDue] = useState('');
  const [given, setGiven] = useState('');
  const [phone, setPhone] = useState('');
  const [rating, setRating] = useState('');
  const [lender, setLender] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const dataresponse = await axios.get('http://localhost:8080/api/data');
        setData(dataresponse.data);
        const lendeeresponse = await axios.get('http://localhost:8080/api/lendee');
        setLendeeClass(lendeeresponse.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();

  }, []);
  const handleInsert = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/data', {
        name,
        email,
        password
      });
      
      alert('Data inserted!'); 
    } catch (err) {
      console.log(err);
    }
  }
  const UpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/updateuser', {
        lender,  
        name,
        email
      });
      
      alert('Data Updated!'); 
    } catch (err) {
      console.log(err);
    }
  }
  const DeleteUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/deleteuser', {
        lender,
      });
      
      alert('User Deleted!'); 
    } catch (err) {
      console.log(err);
    }
  }
  const lendeeInsert = async (a) => {
    a.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/lendee', {
        lend_name, 
        amount,
        due,
        given,
        phone,
        rating,
        lender
      });
      alert('Data inserted!');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Lenders</h1>
      {lenders.map(row => (
        <div key={row.UID}>  
          <p>Name: {row.username}</p> 
          <p>Email: {row.email}</p>
        </div>
      ))}
      <h1>Lendees</h1>
      {lendee.map(row => (
        <div key={row.idLendeeTable}>
          <p>Name: {row.Lendee_Name}</p>
        </div>
      ))}
      <h1>New Lender</h1>
      <form onSubmit={handleInsert}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}  />
        <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Insert Data</button>
      </form>

      <h1>Update Data</h1>
      <form onSubmit={UpdateUser}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}  />
        <input type="number" name="lender" placeholder="Lender" onChange={(e) => setLender(e.target.value)}/>
        <button type="submit">Update</button>
      </form>

      <h1>Delete Data</h1>  
      <form onSubmit={DeleteUser}>
        <input type="number" name="lender" placeholder="Lender" onChange={(e) => setLender(e.target.value)}/>
        <button type="submit">Delete</button>
      </form>

      <h1>New Lendee</h1>
      <form onSubmit={lendeeInsert}>
        <input type="text" name="name" placeholder="Lendee Name" onChange={(a) => setLendee(a.target.value)}/>
        <input type="number" name="amount" placeholder="Amount Lent" onChange={(a) => setAmount(a.target.value)}/>
        <input type="date" name="due" placeholder="Date Lent" onChange={(a) => setGiven(a.target.value)}/>
        <input type="date" name="given" placeholder="Date Due" onChange={(a) => setDue(a.target.value)}/>
        <input type="number" name="phone" placeholder="Lendee Phone" onChange={(a) => setPhone(a.target.value)}/>
        <input type="number" name="rating" placeholder="Lendee Rating" onChange={(a) => setRating(a.target.value)}/>
        <input type="number" name="lender" placeholder="Lender" onChange={(a) => setLender(a.target.value)}/>
        <button type="submit">New Lend</button>
      </form>
    </div>
  );
}

export default App;