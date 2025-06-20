import React, { useState } from 'react';
import axios from 'axios';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const requestOTP = async () => {
    await axios.post('/api/auth/forgot-password', { email });
    setStep(2);
  };

  const resetPassword = async () => {
    await axios.post('/api/auth/reset-password', { email, otp, newPassword });
    alert('Password reset!');
    setStep(1);
  };

  return (
    <div>
      {step === 1 ? (
        <>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          <button onClick={requestOTP}>Send OTP</button>
        </>
      ) : (
        <>
          <input value={otp} onChange={e => setOTP(e.target.value)} placeholder="Enter OTP" />
          <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New Password" />
          <button onClick={resetPassword}>Reset Password</button>
        </>
      )}
    </div>
  );
}
