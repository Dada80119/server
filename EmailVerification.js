import React, { useState } from 'react';
import axios from 'axios';

function EmailVerification() {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');

  const sendOTP = () => {
    axios.post('http://localhost:3001/sendOTP', { email }).then((response) => {
      setMessage(response.data);
    });
  };

  const verifyOTP = () => {
    axios.post('http://localhost:3001/verifyOTP', { email, userOTP: otp }).then((response) => {
      setMessage(response.data);
    });
  };

  return (
    <div>
      <h2>Email Verification</h2>
      <div>
        <label>Email: </label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <button onClick={sendOTP}>Send OTP</button>
      </div>
      <div>
        <label>OTP: </label>
        <input type="text" onChange={(e) => setOTP(e.target.value)} />
      </div>
      <div>
        <button onClick={verifyOTP}>Verify OTP</button>
      </div>
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default EmailVerification;
