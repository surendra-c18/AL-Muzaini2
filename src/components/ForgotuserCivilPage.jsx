import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Forgotcivil.css';
import logo from '../assets/logo.svg';
import VectorIcon from '../assets/Vector.svg';

const ForgotCivilPage = () => {
  const [civilNumber, setCivilNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateCivilNumber = (value) => {
    const numericOnly = /^\d+$/;
    if (!numericOnly.test(value)) return 'Civil number must contain only numbers';
    if (value.length !== 12) return 'Civil number must be exactly 12 digits';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateCivilNumber(civilNumber);
    if (validationError) {
      setError(validationError);
    } else {
      setError('');
      navigate('/success');
    }
  };

  return (
    <div className="forgot-civil-container">
      <div className="forgot-civil-box">
        <img src={logo} alt="Al Muzaini Exchange Logo" className="forgot-civil-logo" />
        <h2>Forgot Username</h2>
        <p className="forgot-civil-label">Enter Your Civil ID</p>

        <form onSubmit={handleSubmit}>
          <div className="forgot-civil-form-group">
            <div className="forgot-civil-input-wrapper">
              <img src={VectorIcon} alt="Vector Icon" className="forgot-civil-icon" />
              <input
                type="text"
                value={civilNumber}
                onChange={(e) => setCivilNumber(e.target.value)}
                placeholder="Enter Civil Number *"
                required
              />
            </div>
          </div>
          <button type="submit" className="forgot-civil-button">Confirm</button>
          {error && <p className="forgot-civil-error">{error}</p>}
        </form>

        <a href="/forgot-password" className="forgot-civil-link">Forgot Password ?</a>
      </div>
    </div>
  );
};

export default ForgotCivilPage;
