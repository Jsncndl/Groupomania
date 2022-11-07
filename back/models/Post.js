const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  date: { type: Date, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  imageUrl: { type: String },
  userId: { type: String, required: true },
  userLastName: { type: String },
  userFirstName: { type: String },
  userImage: { type: String },
  likes: { type: Number },
  usersLiked: { type: [String] },
});

module.exports = mongoose.model("Post", postSchema);
