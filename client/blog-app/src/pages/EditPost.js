import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API, fetchWithToken } from '../utils/api';
import { UserContext } from '../context/UserContext';
import { notyf } from '../App';

const EditPost = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [form, setForm] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/posts/${id}`)
      .then(res => res.json())
      .then(data => setForm({ title: data.title, content: data.content }));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetchWithToken(`/posts/updatePost/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(form)
    }, user.token);

    if (res.ok) {
      notyf.success('Post updated');
      navigate(`/posts/${id}`);
    } else {
      const data = await res.json();
      notyf.error(data.message || 'Update failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Post</h2>
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
      <button className="btn btn-primary">Update</button>
    </form>
  );
};

export default EditPost;
