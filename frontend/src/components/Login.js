import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response.data.message || 'Invalid credentials');
    }
  };

  const pageStyle = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #d0eaff, #a0cfff)',
    padding: '20px',
  };

  const formContainerStyle = {
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    width: '100%',
    maxWidth: '400px',
  };

  const titleStyle = {
    color: '#0072ff',
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '2.5rem',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'border-color 0.3s ease',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    background: '#0072ff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '20px',
  };

  const errorStyle = {
    color: '#ff3333',
    textAlign: 'center',
    marginTop: '10px',
  };

  const linkStyle = {
    display: 'block',
    textAlign: 'center',
    color: '#0072ff',
    textDecoration: 'none',
    marginTop: '20px',
    fontSize: '14px',
  };

  return (
    <div style={pageStyle}>
      <div style={formContainerStyle}>
        <h1 style={titleStyle}>Welcome Back</h1>
        {error && <p style={errorStyle}>{error}</p>}
        <form onSubmit={onSubmit}>
          <input 
            type="email" 
            placeholder="Email Address" 
            name="email" 
            value={email} 
            onChange={onChange} 
            required 
            style={inputStyle}
          />
          <input 
            type="password" 
            placeholder="Password" 
            name="password" 
            value={password} 
            onChange={onChange} 
            required 
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
        <Link to="/register" style={linkStyle}>
          Don't have an account? Sign up here
        </Link>
      </div>
    </div>
  );
};

export default Login;