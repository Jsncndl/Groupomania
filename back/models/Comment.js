const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  userId: { type: String, required: true },
  postId: { type: String, required: true },
  message: { type: String, required: true },
  like: { type: Number },
  usersLiked: { type: [String] },
});

module.exports = mongoose.model("Comment", commentSchema);
