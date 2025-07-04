import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/UpdatePassword.css';
import logo from '../assets/logo.svg';
import LicenseIcon from '../assets/license.svg';
import UsernameIcon from '../assets/username.svg';
import PasswordIcon from '../assets/password.svg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import successTick from '../assets/success_tick.svg';

const UpdatePassword = () => {
  const [tradeLicense, setTradeLicense] = useState('');
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setTradeLicense(location.state.licenseNumber || '');
      setUsername(location.state.username || '');
    }
  }, [location.state]);

  const isPasswordValid =
    newPassword.length >= 8 &&
    /[A-Z]/.test(newPassword) &&
    /[0-9]/.test(newPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPasswordValid) {
      alert('Please meet all password requirements.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setShowSuccessPopup(true);
  };

  const handlePopupOk = () => {
    setShowSuccessPopup(false);
    navigate('/');
  };

  return (
    <div className="updatepass-container">
      <div className="updatepass-box">
        <div className="updatepass-logo">
          <img src={logo} alt="Al Muzaini Exchange Logo" />
        </div>
        <h2 className="updatepass-heading">Update Password</h2>

        <form onSubmit={handleSubmit} className="updatepass-form">
          <div className="updatepass-row">
            <div className="updatepass-form-group">
              <div className="updatepass-input-icon-wrapper">
                <img src={LicenseIcon} alt="License Icon" className="updatepass-icon" />
                <input
                  type="text"
                  value={tradeLicense}
                  onChange={(e) => setTradeLicense(e.target.value)}
                  placeholder="Enter Trade License Number"
                  required
                />
              </div>
            </div>

            <div className="updatepass-form-group">
              <div className="updatepass-input-icon-wrapper">
                <img src={UsernameIcon} alt="Username Icon" className="updatepass-icon" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>
          </div>

          <div className="updatepass-row">
            <div className="updatepass-form-group">
              <div className="updatepass-input-icon-wrapper">
                <img src={PasswordIcon} alt="Password Icon" className="updatepass-icon" />
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (!isPasswordTouched && e.target.value.length > 0) {
                      setIsPasswordTouched(true);
                    }
                  }}
                  placeholder="Enter new password"
                />
                {newPassword && (
                  <span className="eye-toggle" onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                )}
              </div>

              {isPasswordTouched && (
                <ul className="updatepass-password-reqs">
                  <li className={newPassword.length >= 8 ? 'valid' : 'invalid'}>
                    {newPassword.length >= 8 ? '✔' : '✖'} At least 8 characters
                  </li>
                  <li className={/[A-Z]/.test(newPassword) ? 'valid' : 'invalid'}>
                    {/[A-Z]/.test(newPassword) ? '✔' : '✖'} At least 1 capital letter
                  </li>
                  <li className={/[0-9]/.test(newPassword) ? 'valid' : 'invalid'}>
                    {/[0-9]/.test(newPassword) ? '✔' : '✖'} At least 1 digit
                  </li>
                </ul>
              )}
            </div>

            <div className="updatepass-form-group">
              <div className="updatepass-input-icon-wrapper">
                <img src={PasswordIcon} alt="Password Icon" className="updatepass-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                />
                {confirmPassword && (
                  <span className="eye-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="updatepass-submit-btn"
            disabled={!isPasswordValid || newPassword !== confirmPassword}
          >
            Confirm
          </button>
        </form>
      </div>

      {showSuccessPopup && (
         <div className="updatepass-popup-overlay">
            <div className="updatepass-popup-box animated-popup">
              <div className="success-check-circle">
                 <div className="check-mark">✓</div>
              </div>
            <h3 className="updatepass-success-title">Password Updated Successfully!</h3>
          <p className="updatepass-success-subtitle">You can now log in with your new password.</p>
          <button className="updatepass-popup-ok" onClick={handlePopupOk}>
                  Go to Login
          </button>
         </div>
      </div>
      )}
    </div>
  );
};

export default UpdatePassword;
