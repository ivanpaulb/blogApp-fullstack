import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import UserProvider from './context/UserContext';
import BlogNavbar from './components/BlogNavbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PostDetails from './pages/PostDetails';
import PrivateRoute from './components/PrivateRoute';

export const notyf = new Notyf();

function App() {
  return (
    <UserProvider>
      <Router>
        <BlogNavbar />
        <div className="container mt-3">
          <Routes>
            <Route path="/posts" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route
              path="/create"
              element={<PrivateRoute element={<CreatePost />} />}
            />
            <Route
              path="/edit/:id"
              element={<PrivateRoute element={<EditPost />} />}
            />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
