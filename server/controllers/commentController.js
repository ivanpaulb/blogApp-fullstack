const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    if( !content) {
      return res.status(400).send({ error: 'Content is required.' });
    }
    const comment = new Comment({
      content: req.body.content,
      post: req.params.postId,
      user: req.user.userId,
    });

    await comment.save();
    res.status(201).send({
        message: "Comment added successfully.",
        comment: comment
    });
  } catch (err) {
    console.error('Error adding comment:', err.message);
    res.status(500).send({ error: 'Failed to add comment' });
  }
};

exports.getPostComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate('user', 'username');
    res.send(comments);
  } catch (err) {
    console.error('Error fetching comments:', err.message);
    res.status(500).send({ error: 'Failed to retrieve comments' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).send({ error: 'Comment not found' });
    }

    const isOwner = comment.user.toString() === req.user.userId;
    if (!isOwner && !req.user.isAdmin) {
      return res.status(403).send({ error: 'Unauthorized' });
    }

    await comment.deleteOne();
    res.send({
        message: "Comment deleted successfully."
    });
  } catch (err) {
    console.error('Error deleting comment:', err.message);
    res.status(500).send({ error: 'Failed to delete comment' });
  }
};
