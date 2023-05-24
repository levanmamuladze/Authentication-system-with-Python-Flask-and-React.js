import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    console.log("hello")
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: signupEmail, password: signupPassword }),
    });

    // if (response.ok) {
    //   navigate('/login');
    // }
  };

  const handleLogin = async () => {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    });

    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem('token', data.access_token);
      navigate('/private');
    }
  };

  const handleLogout = () => {
    
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h1>Authentication</h1>
      <form >
        <h2>Signup</h2>
        <input type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} placeholder="Password" required />
        <button  type="button" onClick={handleSignup}>Signup</button>
      </form>

      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
