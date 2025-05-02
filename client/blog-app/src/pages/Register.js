import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../utils/api';
import { notyf } from '../App';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/users/register`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await res.json();
    if (res.ok) {
      notyf.success('Registered successfully');
      navigate('/login');
    } else {
      notyf.error(data.error || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div className="mb-3">
        <label>Username</label>
        <input className="form-control" value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })} required />
      </div>
      <div className="mb-3">
        <label>Email</label>
        <input type="email" className="form-control" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} required />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input type="password" className="form-control" value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })} required />
      </div>
      <button className="btn btn-primary">Register</button>
    </form>
  );
};

export default Register;
