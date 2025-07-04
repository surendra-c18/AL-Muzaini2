import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Forgotpassword.css';
import logo from '../assets/logo.svg';
import VectorIcon from '../assets/Vector.svg';
import whatsappIcon from '../assets/whatsapp-icon.svg';
import messageIcon from '../assets/message-icon.svg';
import emailIcon from '../assets/email-icon.svg';
import cancelIcon from '../assets/cancel.svg';
import UsernameIcon from '../assets/username.svg';

const ForgotPassword = () => {
  const [licenseNumber, setLicenseNumber] = useState('');
  const [username, setUsername] = useState('');
  const [licenseError, setLicenseError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');
  const navigate = useNavigate();

  const validateLicenseNumber = (value) => {
    const numericOnly = /^\d+$/;
    if (!numericOnly.test(value)) return 'License number must contain only numbers';
    if (value.length !== 12) return 'License number must be exactly 12 digits';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const licenseValidation = validateLicenseNumber(licenseNumber);
    const usernameValidation = username.trim() === '' ? 'Username is required' : '';
    setLicenseError(licenseValidation);
    setUsernameError(usernameValidation);

    if (!licenseValidation && !usernameValidation) {
      setShowVerificationPopup(true);
    }
  };

  const handleVerificationSelection = (method) => {
    setSelectedMethod(method);
  };

  const handleContinue = () => {
    if (selectedMethod) {
      navigate('/otp-modal', {
        state: {
          from: 'forgot-password',
          licenseNumber,
          username,
        },
      });
    }
  };

  const closePopup = () => {
    setShowVerificationPopup(false);
    setSelectedMethod('');
  };

  return (
    <div className="fp-container">
      <div className="fp-box">
        <img src={logo} alt="Al Muzaini Exchange Logo" className="fp-logo" />
        <h2 className="fp-heading">Forgot Password</h2>

        <form onSubmit={handleSubmit}>
          <p className="fp-label">Enter Your Civil ID</p>

          <div className="fp-form-group">
            <div className={`fp-input-with-icon fp-underline-style ${licenseError ? 'fp-error-border' : ''}`}>
              <img src={VectorIcon} alt="Vector Icon" className="fp-vector-icon" />
              <input
                type="text"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                placeholder="Enter License Number *"
              />
            </div>
            {licenseError && <p className="fp-error-text">{licenseError}</p>}
          </div>

          <div className="fp-form-group">
            <div className={`fp-input-with-icon fp-underline-style ${usernameError ? 'fp-error-border' : ''}`}>
              <img src={UsernameIcon} alt="Username Icon" className="fp-vector-icon" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter the username *"
              />
            </div>
            {usernameError && <p className="fp-error-text">{usernameError}</p>}
          </div>

          <button type="submit" className="fp-button">Confirm</button>
        </form>

        <a href="/forgot-username" className="fp-link">Forgot Username ?</a>

        {showVerificationPopup && (
          <div className="fp-verification-popup">
            <div className="fp-popup-content">
              <div className="fp-popup-header">
                <h3 className="fp-popup-title">Choose Verification Code</h3>
                <img src={cancelIcon} alt="Close" className="fp-close-icon" onClick={closePopup} />
              </div>
              <div className="fp-popup-separator"></div>

              <button
                className={`fp-otp-option ${selectedMethod === 'SMS' ? 'selected' : ''}`}
                onClick={() => handleVerificationSelection('SMS')}
              >
                <img src={messageIcon} alt="SMS" className={`fp-otp-icon ${selectedMethod === 'SMS' ? 'fp-red-icon' : ''}`} />
                <span className="fp-otp-text">Get OTP via SMS</span>
                {selectedMethod === 'SMS' && <span className="fp-tick">✓</span>}
              </button>

              <button
                className={`fp-otp-option ${selectedMethod === 'WhatsApp' ? 'selected' : ''}`}
                onClick={() => handleVerificationSelection('WhatsApp')}
              >
                <img src={whatsappIcon} alt="WhatsApp" className={`fp-otp-icon ${selectedMethod === 'WhatsApp' ? 'fp-red-icon' : ''}`} />
                <span className="fp-otp-text">Get OTP via WhatsApp</span>
                {selectedMethod === 'WhatsApp' && <span className="fp-tick">✓</span>}
              </button>

              <button
                className={`fp-otp-option ${selectedMethod === 'Email' ? 'selected' : ''}`}
                onClick={() => handleVerificationSelection('Email')}
              >
                <img src={emailIcon} alt="Email" className={`fp-otp-icon ${selectedMethod === 'Email' ? 'fp-red-icon' : ''}`} />
                <span className="fp-otp-text">Get OTP via Email</span>
                {selectedMethod === 'Email' && <span className="fp-tick">✓</span>}
              </button>

              <button className="fp-continue-btn" onClick={handleContinue}>Continue</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
