import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../utils/api';
import { UserContext } from '../context/UserContext';
import { notyf } from '../App';

const Login = () => {
  const { saveUserCredentials } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/users/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await res.json();
    if (res.ok) {
      saveUserCredentials(data.access);
      notyf.success('Logged in successfully');
      navigate('/posts');
    } else {
      notyf.error(data.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="mb-3">
        <label>Email</label>
        <input type="email" className="form-control" value={email}
          onChange={e => setEmail(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input type="password" className="form-control" value={password}
          onChange={e => setPassword(e.target.value)} required />
      </div>
      <button className="btn btn-primary">Login</button>
    </form>
  );
};

export default Login;
