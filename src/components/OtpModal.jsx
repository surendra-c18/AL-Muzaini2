import React, { useState } from 'react';
import '../styles/OtpModal.css';
import cancelIcon from '../assets/cancel.svg';
import otpIcon from '../assets/OtpIcon.svg';
import { useNavigate, useLocation } from 'react-router-dom';

const OtpModal = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from;

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = otp.split('');
    updatedOtp[index] = value;
    const newOtp = updatedOtp.join('');
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleVerify = () => {
    if (otp === '1234') {
      setError('');
      if (fromPage === 'forgot-password') {
        navigate('/update-password', {
          state: {
            licenseNumber: location.state?.licenseNumber,
            username: location.state?.username,
          },
        });
      } else if (fromPage === 'forgot-username') {
        navigate('/forgot-username-civil');
      } else {
        navigate('/');
      }
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <span className="modal-title">OTP Verification</span>
          <img src={cancelIcon} alt="Close" className="modal-close-icon" onClick={handleClose} />
        </div>

        <img src={otpIcon} alt="OTP Icon" className="modal-otp-icon" />
        <p className="modal-title">OTP Verification</p>
        <p className="otp-instruction">
          Enter the OTP sent to <strong>+965 •••• ••123</strong>
        </p>

        <div className="otp-input-container">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength={1}
              value={otp[index] || ''}
              onChange={(e) => handleChange(e, index)}
              className="otp-box"
            />
          ))}
        </div>

        {error && <p className="otp-error">{error}</p>}

        <p className="resend-text">
          Didn’t receive the OTP? <span className="resend-link">Resend</span>
        </p>

        <button className="signup-button" onClick={handleVerify}>Verify</button>
      </div>
    </div>
  );
};

export default OtpModal;
