import React, { useState } from 'react';
import axios from 'axios';

// export default function ForgotPassword() {
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState('');
//   const [otp, setOTP] = useState('');
//   const [newPassword, setNewPassword] = useState('');

//   const requestOTP = async () => {
//     await axios.post('/api/auth/forgot-password', { email });
//     setStep(2);
//   };

//   const resetPassword = async () => {
//     await axios.post('/api/auth/reset-password', { email, otp, newPassword });
//     alert('Password reset!');
//     setStep(1);
//   };

//   return (
//     <div>
//       {step === 1 ? (
//         <>
//           <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
//           <button onClick={requestOTP}>Send OTP</button>
//         </>
//       ) : (
//         <>
//           <input value={otp} onChange={e => setOTP(e.target.value)} placeholder="Enter OTP" />
//           <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New Password" />
//           <button onClick={resetPassword}>Reset Password</button>
//         </>
//       )}
//     </div>
//   );
// }


export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [newPassword, setNewPassword] = useState("");

  const sendOtp = async () => {
    await fetch("http://localhost:5001/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setStep(2);
  };

  const verifyOtp = async () => {
    const res = await fetch("http://localhost:5001/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    if (res.ok) setStep(3);
  };

  const resetPassword = async () => {
    await fetch("http://localhost:5001/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });
    alert("Password reset successful");
  };

  return (
    <div>
      {step === 1 && (
        <>
          <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}
      {step === 2 && (
        <>
          <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
      {step === 3 && (
        <>
          <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <button onClick={resetPassword}>Reset Password</button>
        </>
      )}
    </div>
  );
}
