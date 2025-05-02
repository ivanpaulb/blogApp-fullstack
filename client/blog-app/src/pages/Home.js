import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../utils/api';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${API}/posts/all`)
      .then(res => res.json())
      .then(setPosts)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>All Posts</h2>
  
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map(post => (
          <div className="card mb-3" key={post._id}>
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p>{post.content}</p>
              <Link to={`/posts/${post._id}`} className="btn btn-primary btn-sm">More Details</Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
  
};

export default Home;
