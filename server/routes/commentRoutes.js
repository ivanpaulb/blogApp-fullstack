const express = require('express');
const router = express.Router();
const { verifyUser } = require('../auth');
const {
  addComment,
  getPostComments,
  deleteComment
} = require('../controllers/commentController');

router.get('/:postId', getPostComments);
router.post('/addComment/:postId', verifyUser, addComment);
router.delete('/deleteComment/:commentId', verifyUser, deleteComment);

module.exports = router;
