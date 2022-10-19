const Comment = require("../models/Comment");
const mongoose = require("mongoose");
const Post = require("../models/Post");

exports.newComment = (req, res, next) => {
  const id = new mongoose.Types.ObjectId();
  const comment = new Comment({
    _id: id,
    postId: req.body.postId,
    message: req.body.message,
    userId: req.auth.userId,
    likes: 0,
    usersLiked: [],
  });
  comment
    .save()
    .then((comment) => { 
      Post.findOneAndUpdate(
        { _id: comment.postId },
        { $addToSet: {comments: comment._id} },
        { new: true }
      )
        .then((post) => res.status(200).json(post))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};
