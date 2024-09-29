// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const onLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navStyle = {
    background: 'linear-gradient(135deg, #00c6ff, #0072ff)',
    padding: '15px 30px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  };

  const ulStyle = {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  };

  const liStyle = {
    margin: '0 15px',
  };

  const linkStyle = {
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    transition: 'all 0.3s ease',
  };

  const buttonStyle = {
    backgroundColor: '#ffffff',
    color: '#0072ff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '30px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const logoStyle = {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 'bold',
    textDecoration: 'none',
    marginRight: 'auto', // This pushes the logo to the left
  };

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li style={{ ...liStyle, marginRight: 'auto' }}>
          <Link to="/" style={logoStyle}>
            Personal Finance Manager
          </Link>
        </li>
        {!isAuthenticated && (
          <li style={liStyle}>
            <Link to="/" style={linkStyle}>Home</Link>
          </li>
        )}
        {isAuthenticated ? (
          <>
            <li style={liStyle}>
              <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
            </li>
            <li style={liStyle}>
              <button
                onClick={onLogout}
                style={buttonStyle}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#e6f7ff';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#ffffff';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li style={liStyle}>
              <Link
                to="/register"
                style={linkStyle}
                onMouseOver={(e) => {
                  e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)';
                }}
                onMouseOut={(e) => {
                  e.target.style.textShadow = 'none';
                }}
              >
                Register
              </Link>
            </li>
            <li style={liStyle}>
              <Link
                to="/login"
                style={linkStyle}
                onMouseOver={(e) => {
                  e.target.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.8)';
                }}
                onMouseOut={(e) => {
                  e.target.style.textShadow = 'none';
                }}
              >
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;