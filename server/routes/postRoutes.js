const express = require('express');
const router = express.Router();
const { verifyUser } = require('../auth');
const {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost
} = require('../controllers/postController');

router.get('/all', getAllPosts);
router.get('/:id', getPost);
router.post('/', verifyUser, createPost);
router.patch('/updatePost/:id', verifyUser, updatePost);
router.delete('/deletePost/:id', verifyUser, deletePost);

module.exports = router;
