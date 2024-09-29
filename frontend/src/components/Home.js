import React from 'react';
import { Link } from 'react-router-dom';
import controlImage from '../assets/control.jpg';
import goalsImage from '../assets/goals.jpg';
import patternsImage from '../assets/pattern.jpg';
import emergencyImage from '../assets/emergency.jpg';
import investmentsImage from '../assets/investments.jpg';

const Home = () => {
  const pageStyle = {
    minHeight: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
    background: 'linear-gradient(135deg, #00c6ff, #0072ff)',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflowX: 'hidden', // Prevent horizontal scrollbar
  };

  const containerStyle = {
    width: '100%',
    maxWidth: '1200px', // Limit maximum width for larger screens
    padding: '40px 20px',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '15px',
    backdropFilter: 'blur(10px)',
    margin: '20px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  };

  const titleStyle = {
    fontSize: '2.8rem',
    color: '#ffffff',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  };

  const descriptionStyle = {
    fontSize: '1.3rem',
    color: '#e6f7ff',
    marginBottom: '40px',
  };

  const listStyle = {
    listStyle: 'none',
    padding: 0,
    textAlign: 'left',
  };

  const listItemStyle = {
    display: 'flex',
    alignItems: 'center',
    margin: '30px 0',
    fontSize: '1.1rem',
    color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    padding: '20px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
    },
  };

  const imageStyle = {
    width: '40%',
    height: '180px',
    objectFit: 'cover',
    marginRight: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const textStyle = {
    flex: 1,
  };

  const buttonStyle = {
    display: 'inline-block',
    backgroundColor: '#ffffff',
    color: '#0072ff',
    padding: '15px 30px',
    marginTop: '40px',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    borderRadius: '30px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  };

  const buttonHover = {
    backgroundColor: '#e6f7ff',
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
  };

  const reasons = [
    {
      image: controlImage,
      alt: "Gain control",
      text: "Gain control: Understand where your money goes and make informed financial decisions.",
    },
    {
      image: goalsImage,
      alt: "Set and achieve goals",
      text: "Set and achieve goals: Track progress towards savings, debt reduction, or other financial milestones.",
    },
    {
      image: patternsImage,
      alt: "Identify spending patterns",
      text: "Identify spending patterns: Discover areas where you can cut back or allocate funds more wisely.",
    },
    {
      image: emergencyImage,
      alt: "Prepare for emergencies",
      text: "Prepare for emergencies: Build an emergency fund to cover unexpected expenses.",
    },
    {
      image: investmentsImage,
      alt: "Make informed investments",
      text: "Make informed investments: Analyze your financial situation to make sound investment choices.",
    },
  ];

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Welcome to Personal Finance Manager</h1>
        <p style={descriptionStyle}>
          Track your income, expenses, and generate reports to manage your finances effectively.
        </p>

        <ul style={listStyle}>
          {reasons.map((reason, index) => (
            <li key={index} style={listItemStyle}>
              {index % 2 === 0 ? (
                <>
                  <img src={reason.image} alt={reason.alt} style={imageStyle} />
                  <span style={textStyle}>{reason.text}</span>
                </>
              ) : (
                <>
                  <span style={textStyle}>{reason.text}</span>
                  <img src={reason.image} alt={reason.alt} style={imageStyle} />
                </>
              )}
            </li>
          ))}
        </ul>

        <Link
          to="/register"
          style={buttonStyle}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = buttonHover.backgroundColor;
            e.target.style.transform = buttonHover.transform;
            e.target.style.boxShadow = buttonHover.boxShadow;
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = buttonStyle.backgroundColor;
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = buttonStyle.boxShadow;
          }}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;