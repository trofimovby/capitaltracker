import React, { useState, useEffect } from 'react';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({ amount: '', type: '', category: '', description: '', date: '' });

  useEffect(() => {
    fetch("/users/1/transactions/")
      .then(response => response.json())
      .then(data => setTransactions(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/users/1/transactions/", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then(() => {
      setFormData({ amount: '', type: '', category: '', description: '', date: '' });
      alert("Transaction added successfully!");
    });
  };

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={formData.amount} placeholder="Amount" onChange={(e) => setFormData({...formData, amount: e.target.value})} required />
        <input type="text" value={formData.type} placeholder="Type (income/expense)" onChange={(e) => setFormData({...formData, type: e.target.value})} required />
        <input type="text" value={formData.category} placeholder="Category" onChange={(e) => setFormData({...formData, category: e.target.value})} required />
        <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
        <input type="text" value={formData.description} placeholder="Description" onChange={(e) => setFormData({...formData, description: e.target.value})} />
        <button type="submit">Add Transaction</button>
      </form>

      <h2>Transaction List</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            {transaction.amount} - {transaction.type} - {transaction.category} - {transaction.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
