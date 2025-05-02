import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { fetchWithToken } from '../utils/api';
import { notyf } from '../App';

const CreatePost = () => {
  const { user } = useContext(UserContext);
  const [form, setForm] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetchWithToken('/posts', {
      method: 'POST',
      body: JSON.stringify(form)
    }, user.token);

    if (res.ok) {
      notyf.success('Post created');
      navigate('/posts');
    } else {
      const data = await res.json();
      notyf.error(data.error || 'Failed to create post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Post</h2>
      <div className="mb-3">
        <label>Title</label>
        <input className="form-control" value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })} required />
      </div>
      <div className="mb-3">
        <label>Content</label>
        <textarea className="form-control" rows="5" value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })} required />
      </div>
      <button className="btn btn-success">Create</button>
    </form>
  );
};

export default CreatePost;
