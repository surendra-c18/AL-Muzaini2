import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import rateCalculatorImg from '../assets/Rate Calculator.svg';
import branchesImg from '../assets/Branches.svg';
import supportImg from '../assets/Support.svg';
import worldmap from '../assets/world-map.svg';
import logo from '../assets/logo.svg';
import english from '../assets/english.svg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginResult, setLoginResult] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;
    setUsernameError('');
    setPasswordError('');
    setLoginResult('');

    if (!username) {
      setUsernameError('Username is required');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    }

    if (hasError) return;

    if (username === 'admin' && password === 'admin123') {
      setLoginResult('Login successful!');
    } else {
      setLoginResult('');
      setPasswordError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={logo} alt="Logo" className="logo" />
        <img src={worldmap} alt="World Map" className="world-map" />
        <h2>Always Near You - Since 1942</h2>
        <p>
          Transfer money safely, securely and conveniently with the number one
          exchange company in Kuwait
        </p>
        <div className="buttons">
          <a href="#" className="btn-img">
            <img src={rateCalculatorImg} alt="Rate Calculator" />
          </a>
          <a href="#" className="btn-img">
            <img src={branchesImg} alt="Branches" />
          </a>
          <a href="#" className="btn-img">
            <img src={supportImg} alt="Support" />
          </a>
        </div>
      </div>

      <div className="login-right">
        <div className="language-switch">
          <a href="#"><img className="temp" src={english} alt="English" /></a>
        </div>
        <h2>Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && <p style={{ color: 'red', fontSize: '13px', marginBottom: '10px', marginTop: '5px' }}>{usernameError}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p style={{ color: 'red', fontSize: '13px', marginBottom: '10px', marginTop: '5px' }}>{passwordError}</p>}

          <div className="forgot-links">
            <Link to="/forgot-username" className="forgot">Forgot Username?</Link>
            <Link to="/forgot-password" className="forgot">Forgot Password?</Link>
          </div>

          <button type="submit" className="login-btn">Login</button>

          {loginResult && <p style={{ color: 'green', fontSize: '14px', marginTop: '10px' }}>{loginResult}</p>}
        </form>
        <p>
          Don't have an account? <a href="#">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
