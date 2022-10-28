const fs = require("fs");

const Post = require("../models/Post");

exports.newPost = (req, res, next) => {
  const postObject = req.file
    ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        ...req.body,
      };
  const post = new Post({
    ...postObject,
    date: Date.now(),
    userId: req.auth.userId,
    userLastName: req.body.userLastName,
    userFirstName: req.body.userFirstName,
    userImage: req.body.userImage,
    likes: 0,
    usersLiked: [],
  });
  post
    .save()
    .then(() => res.status(201).json({ message: "New post created" }))
    .catch((error) => res.status(401).json({ error }));
};

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => res.status(201).json({ posts }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (req.auth.userId === post.userId || req.auth.isAdmin) {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, (err) => {
          if (err) throw err;
          return Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Post deleted" }))
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        return res.status(401).json({ message: "Not authorized" });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyPost = async (req, res, next) => {
  const postObject = req.file
    ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        ...req.body,
      };

  const post = new Post({
    ...postObject,
  });
  if (req.auth.userId === post.userId || req.auth.isAdmin) {
    if (req.body.deleteImage) {
      const post = await Post.findById(req.params.id);
      const filename = post.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, (err) => {
        if (err) throw err;
        post.imageUrl = undefined;
        post
          .save()
          .catch((error) => res.status(400).json({ error }));
      });
    }
    Post.updateOne(
      { _id: req.params.id },
      { ...postObject, _id: req.params.id }
    )
      .then(() => res.status(200).json({ message: "Post updated" }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
};

exports.likePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      const newValues = {
        usersLiked: post.usersLiked,
        likes: 0,
      };
      if (req.body.like && newValues.usersLiked.includes(req.auth.userId)) {
        const index = newValues.usersLiked.indexOf(req.auth.userId);
        newValues.usersLiked.splice(index, 1);
        newValues.likes = newValues.usersLiked.length;
      } else if (req.body.like) {
        newValues.usersLiked.push(req.auth.userId);
        newValues.likes = newValues.usersLiked.length;
      }
      Post.updateOne({ _id: req.params.id }, newValues)
        .then(() => res.status(200).json({ message: "Evaluation confirmed" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
