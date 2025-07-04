import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Forgotusername from './components/Forgotusername';
import Forgotpassword from './components/Forgotpassword';
import OtpModal from './components/OtpModal';
import ForgotuserCivilPage from './components/ForgotuserCivilPage';
import UpdatePassword from './components/Updatepassword';
import SuccessMessage from './components/Successmessage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-username" element={<Forgotusername />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/otp-modal" element={<OtpModal />} />
        <Route path="/forgot-username-civil" element={<ForgotuserCivilPage />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/success" element={<SuccessMessage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
