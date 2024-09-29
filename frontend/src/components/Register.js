//register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [error, setError] = useState('');
  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setError('Passwords do not match');
    } else {
      try {
        const res = await axios.post('/api/users/register', { name, email, password });
        console.log(res.data);
        navigate('/login');
      } catch (err) {
        setError(err.response.data.message || 'An error occurred during registration');
      }
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
    fontSize: '2rem',
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

  return (
    <div style={pageStyle}>
      <div style={formContainerStyle}>
        <h1 style={titleStyle}>Create Your Account</h1>
        {error && <p style={errorStyle}>{error}</p>}
        <form onSubmit={onSubmit}>
          <input 
            type="text" 
            placeholder="Full Name" 
            name="name" 
            value={name} 
            onChange={onChange} 
            required 
            style={inputStyle}
          />
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
          <input 
            type="password" 
            placeholder="Confirm Password" 
            name="password2" 
            value={password2} 
            onChange={onChange} 
            required 
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;