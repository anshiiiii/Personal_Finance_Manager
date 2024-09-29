import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    description: ''
  });

  const { type, amount, category, description } = formData;

  useEffect(() => {
    const fetchTransactions = async () => {
      const config = {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      };
      try {
        const res = await axios.get('/api/transactions', config);
        setTransactions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTransactions();
  }, []);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token')
      }
    };
    try {
      const res = await axios.post('/api/transactions', formData, config);
      setTransactions([res.data, ...transactions]);
      setFormData({
        type: 'expense',
        amount: '',
        category: '',
        description: ''
      });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const deleteTransaction = async id => {
    const config = {
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    };
    try {
      await axios.delete(`/api/transactions/${id}`, config);
      setTransactions(transactions.filter(transaction => transaction._id !== id));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  // Calculate total income and expenses
  const totalIncome = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenses = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // Prepare data for Pie Chart
  const pieChartData = [
    { name: 'Income', value: totalIncome },
    { name: 'Expenses', value: totalExpenses }
  ];

  const COLORS = ['#00C49F', '#FF8042'];

  // Prepare data for Bar Chart
  const barChartData = [
    { name: 'Income', amount: totalIncome },
    { name: 'Expenses', amount: totalExpenses }
  ];

  // Prepare data for Detailed Line Plot
  const lineChartData = transactions
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .reduce((acc, transaction) => {
      const date = new Date(transaction.date).getTime();
      const existingEntry = acc.find(entry => entry.date === date);

      if (existingEntry) {
        existingEntry.income += transaction.type === 'income' ? transaction.amount : 0;
        existingEntry.expense += transaction.type === 'expense' ? transaction.amount : 0;
      } else {
        acc.push({
          date,
          income: transaction.type === 'income' ? transaction.amount : 0,
          expense: transaction.type === 'expense' ? transaction.amount : 0,
        });
      }

      return acc;
    }, []);

  // Calculate running balances
  let runningBalance = 0;
  lineChartData.forEach(data => {
    runningBalance += data.income - data.expense;
    data.balance = runningBalance;
  });

  // Styling section
  const styles = {
    page: {
      background: 'linear-gradient(135deg, #d0eaff, #a0cfff)',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      textAlign: 'center',
      fontSize: '2rem',
      marginBottom: '2rem',
      color: '#333'
    },
    formSection: {
      backgroundColor: '#ffffff',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '2rem',
    },
    chartSection: {
      marginTop: '2rem',
      backgroundColor: '#ffffff',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    transactionList: {
      backgroundColor: '#ffffff',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      marginTop: '2rem',
      listStyleType: 'none'
    },
    transactionItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.5rem',
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.header}>Financial Dashboard</h1>
      
      {/* Add New Transaction Section */}
      <div style={styles.formSection}>
        <h2>Add New Transaction</h2>
        <form onSubmit={e => onSubmit(e)}>
          <select name="type" value={type} onChange={e => onChange(e)}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input
            type="number"
            placeholder="Amount"
            name="amount"
            value={amount}
            onChange={e => onChange(e)}
            required
          />
          <input
            type="text"
            placeholder="Category"
            name="category"
            value={category}
            onChange={e => onChange(e)}
            required
          />
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={description}
            onChange={e => onChange(e)}
          />
          <button type="submit">Add Transaction</button>
        </form>
      </div>

      {/* Recent Transactions Section */}
      <div style={styles.transactionList}>
        <h2>Recent Transactions</h2>
        <ul>
          {transactions.map(transaction => (
            <li key={transaction._id} style={styles.transactionItem}>
              <span>{transaction.description} - {transaction.amount} ({transaction.type})</span>
              <button onClick={() => deleteTransaction(transaction._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Income vs Expenses (Pie Chart) */}
      <div style={styles.chartSection}>
        <h2>Income vs Expenses Overview</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={pieChartData}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Financial Bar Chart */}
      <div style={styles.chartSection}>
        <h2>Total Income and Expenses</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Financial Analysis Line Plot */}
      <div style={styles.chartSection}>
        <h2>Detailed Financial Analysis</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={lineChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              type="number"
              scale="time"
              domain={['dataMin', 'dataMax']}
              tickFormatter={(unixTime) => moment(unixTime).format('MM/DD/YY')}
            />
            <YAxis yAxisId="left" orientation="left" stroke="#82ca9d" />
            <YAxis yAxisId="right" orientation="right" stroke="#8884d8" />
            <Tooltip
              labelFormatter={(value) => moment(value).format('MM/DD/YYYY')}
              formatter={(value, name) => [`$${value.toFixed(2)}`, name.charAt(0).toUpperCase() + name.slice(1)]}
            />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="income" stroke="#82ca9d" activeDot={{ r: 8 }} name="Income" />
            <Line yAxisId="left" type="monotone" dataKey="expense" stroke="#ff7300" activeDot={{ r: 8 }} name="Expense" />
            <Line yAxisId="right" type="monotone" dataKey="balance" stroke="#8884d8" dot={false} name="Balance" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;