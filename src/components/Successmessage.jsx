import React from 'react';
import '../styles/SuccessMessage.css';
import successTick from '../assets/success_tick.svg';
import { useNavigate } from 'react-router-dom';
const SuccessMessage = () => {
    const nav =useNavigate();
  const formattedDateTime = new Date().toLocaleString('en-GB', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
const close=()=>{
nav('/');
}
  return (
    <div className="success-overlay">
      <div className="success-modal">
        <img src={successTick} alt="Success Tick" className="success-tick" />
        <h2>Username Sent Successfully!</h2>
        <p className="timestamp">{formattedDateTime.replace(',', ' |')}</p>

        <p className="info-text">
          Your username has been sent to your registered <strong>mobile number</strong> and <strong>email address</strong>.
        </p>

        <button className="back-home-btn" onClick={close}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
