import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const BlogNavbar = () => {
  const { user, clearUserCredentials } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand navbar-light bg-light px-3">
      <Link className="navbar-brand" to="/">Blog App</Link>
      <div className="navbar-nav">
        <Link className="nav-link" to="/posts">Posts</Link>
        {user && <Link className="nav-link" to="/create">Create a Post</Link>}
      </div>
      <div className="ms-auto">
        {user ? (
          <>
            <span className="me-3">{user.username}</span>
            <button className="btn btn-outline-danger btn-sm" onClick={clearUserCredentials}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-outline-primary me-2 btn-sm" to="/login">Login</Link>
            <Link className="btn btn-primary btn-sm" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default BlogNavbar;
