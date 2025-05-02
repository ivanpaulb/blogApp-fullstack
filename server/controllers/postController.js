const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
  
    const { title, content } = req.body;
    if( !title || !content) {
      return res.status(400).send({ error: 'Title and content are required.' });
    }

    const post = new Post({ title, content, author: req.user.userId });
    await post.save();
    res.status(201).send({
        message: "Post created successfully.",
        newPost: post
    });
  } catch (error) {
    console.error('Create Post Error:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.send(posts);
  } catch (error) {
    console.error('Get All Posts Error:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) return res.status(404).send({ error: 'Post not found' });
    res.send(post);
  } catch (error) {
    console.error('Get Post Error:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send({ error: 'Post not found' });

    if (post.author.toString() !== req.user.userId) {
      return res.status(403).send({ error: 'Unauthorized' });
    }

    Object.assign(post, req.body);
    await post.save();
    res.send({
        message: "Post updated successfully.",
        updatedPost: post
    });
  } catch (error) {
    console.error('Update Post Error:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send({ error: 'Post not found' });

    const isOwner = post.author.toString() === req.user.userId;
    if (!isOwner && !req.user.isAdmin) {
      return res.status(403).send({ error: 'Unauthorized' });
    }

    await post.deleteOne();
    res.send({
        message: "Post deleted successfully."
    });
  } catch (error) {
    console.error('Delete Post Error:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};
