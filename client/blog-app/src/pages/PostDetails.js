import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API, fetchWithToken } from '../utils/api';
import { UserContext } from '../context/UserContext';
import { notyf } from '../App';

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const loadPost = () => {
    console.log(`${API}/posts/${id}`);
    fetch(`${API}/posts/${id}`)
      .then(res => res.json())
      .then(setPost);
  };

  const loadComments = () => {
    fetch(`${API}/comments/${id}`)
      .then(res => res.json())
      .then(setComments);
  };

  useEffect(() => {
    loadPost();
    loadComments();
  }, [id]);

  useEffect(() => {
    if (user && post) {
      console.log('Username:', user.username);
      console.log(post);
      console.log('isAdmin:', user.isAdmin);
    }
  }, [user, post]);

  const handleComment = async (e) => {
    e.preventDefault();
    const res = await fetchWithToken(`/comments/addComment/${id}`, {
      method: 'POST',
      body: JSON.stringify({ content: comment })
    }, user.token);
    if (res.ok) {
      notyf.success('Comment added');
      setComment('');
      loadComments();
    } else {
      const data = await res.json();
      notyf.error(data.error || 'Failed to comment');
    }
  };

  const deletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    const res = await fetchWithToken(`/posts/deletePost/${id}`, {
      method: 'DELETE'
    }, user.token);
    if (res.ok) {
      notyf.success('Post deleted');
      navigate('/posts');
    } else {
      const data = await res.json();
      notyf.error(data.error || 'Failed to delete post');
    }
  };

  const deleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    const res = await fetchWithToken(`/comments/deleteComment/${commentId}`, {
      method: 'DELETE'
    }, user.token);
    if (res.ok) {
      notyf.success('Comment deleted');
      loadComments();
    } else {
      const data = await res.json();
      notyf.error(data.error || 'Failed to delete comment');
    }
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {user && post && post.author && (
        <div className="mb-2">
          {user.username === post.author.username && (
            <Link to={`/edit/${id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
          )}
          {(user.username === post.author.username || user.isAdmin) && (
            <button className="btn btn-sm btn-danger" onClick={deletePost}>Delete</button>
          )}
        </div>
      )}

      <hr />
      <h4>Comments</h4>
      {comments.map(c => (
        <div key={c._id} className="mb-2">
          <strong>{c.user.username}</strong>: {c.content}
          {(user && (user.username === c.user.username || user.isAdmin)) && (
            <button
              className="btn btn-sm btn-danger ms-2"
              onClick={() => deleteComment(c._id)}
            >
              Delete
            </button>
          )}
        </div>
      ))}
      {user && (
        <form onSubmit={handleComment}>
          <textarea className="form-control mb-2" value={comment}
            onChange={e => setComment(e.target.value)} required />
          <button className="btn btn-secondary btn-sm">Add Comment</button>
        </form>
      )}
    </div>
  );
};

export default PostDetails;
