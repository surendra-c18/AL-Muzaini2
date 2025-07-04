import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Forgotusername.css';
import logo from '../assets/logo.svg';
import VectorIcon from '../assets/Vector.svg';
import whatsappIcon from '../assets/whatsapp-icon.svg';
import messageIcon from '../assets/message-icon.svg';
import emailIcon from '../assets/email-icon.svg';
import cancelIcon from '../assets/cancel.svg';


const ForgotUsername = () => {
  const [licenseNumber, setLicenseNumber] = useState('');
  const [error, setError] = useState('');
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');
  const navigate = useNavigate();

  const validateLicenseNumber = (value) => {
    if (!value) return 'Enter the license number';
    const numericOnly = /^\d+$/;
    if (!numericOnly.test(value)) return 'License number must contain only numbers';
    if (value.length !== 12) return 'License number must be exactly 12 digits';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateLicenseNumber(licenseNumber);
    if (validationError) {
      setError(validationError);
    } else {
      setError('');
      setShowVerificationPopup(true);
    }
  };

  const handleVerificationSelection = (method) => {
    setSelectedMethod(method);
  };

  const handleContinue = () => {
    if (selectedMethod) {
      navigate('/otp-modal', { state: { from: 'forgot-username' } });
    }
  };

  const closePopup = () => {
    setShowVerificationPopup(false);
    setSelectedMethod('');
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <img src={logo} alt="Al Muzaini Exchange Logo" className="logo" />
        <h2>Forgot Username</h2>
        <p className="civil-id-label">Enter Your Civil ID</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className={`input-with-icon underline-style ${error ? 'input-error' : ''}`}>
              <img src={VectorIcon} alt="Vector Icon" className="vector-icon" />
              <input
                type="text"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                placeholder="Enter License Number *"
              />
            </div>
            {error && <p className="error-text">{error}</p>}
          </div>

          <button type="submit">Confirm</button>
        </form>

        <a href="/forgot-password" className="forgot-password">Forgot Password ?</a>

        {showVerificationPopup && (
          <div className="verification-popup">
            <div className="popup-content">
              <div className="popup-header">
                <h3 className="popup-title">Choose Verification Code</h3>
                <img src={cancelIcon} alt="Close" className="close-icon" onClick={closePopup} />
              </div>
              <div className="popup-separator"></div>

              <button
                className={`otp-option ${selectedMethod === 'SMS' ? 'selected' : ''}`}
                onClick={() => handleVerificationSelection('SMS')}
              >
                <img src={messageIcon} alt="SMS" className={`otp-icon ${selectedMethod === 'SMS' ? 'red-icon' : ''}`} />
                <span className="otp-text">Get OTP via SMS</span>
                {selectedMethod === 'SMS' && <span className="tick">✓</span>}
              </button>

              <button
                className={`otp-option ${selectedMethod === 'WhatsApp' ? 'selected' : ''}`}
                onClick={() => handleVerificationSelection('WhatsApp')}
              >
                <img src={whatsappIcon} alt="WhatsApp" className={`otp-icon ${selectedMethod === 'WhatsApp' ? 'red-icon' : ''}`} />
                <span className="otp-text">Get OTP via WhatsApp</span>
                {selectedMethod === 'WhatsApp' && <span className="tick">✓</span>}
              </button>

              <button
                className={`otp-option ${selectedMethod === 'Email' ? 'selected' : ''}`}
                onClick={() => handleVerificationSelection('Email')}
              >
                <img src={emailIcon} alt="Email" className={`otp-icon ${selectedMethod === 'Email' ? 'red-icon' : ''}`} />
                <span className="otp-text">Get OTP via Email</span>
                {selectedMethod === 'Email' && <span className="tick">✓</span>}
              </button>

              <button className="continue-btn" onClick={handleContinue}>Continue</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotUsername;
