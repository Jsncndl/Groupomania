const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();

const User = require("../models/User");
const Post = require("../models/Post");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        userImage: `${req.protocol}://${req.get("host")}/images/profile.png`,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() =>
          res.status(201).json({ message: "Account successfully created" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Wrong email / password" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: "Wrong email / password" });
          }
          if (user.isAdmin) {
            return res.status(200).json({
              userId: user._id,
              token: jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
                expiresIn: "24h",
              }),
              lastName: user.lastName,
              firstName: user.firstName,
              userImage: user.userImage,
              email: user.email,
              isAdmin: user.isAdmin,
            });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
              expiresIn: "24h",
            }),
            lastName: user.lastName,
            firstName: user.firstName,
            userImage: user.userImage,
            email: user.email,
          });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.modifyProfile = (req, res, next) => {
  const userObject = req.file
    ? {
        ...req.body,
        userImage: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  if (req.auth.userId === req.params.id) {
    User.findOne({ _id: req.auth.userId }).then((user) =>
      bcrypt
        .compare(req.body.confirmPassword, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: "Not authorized" });
          } else if (req.body.newPassword) {
            return bcrypt.hash(req.body.newPassword, 10).then((hash) => {
              User.updateOne(
                { _id: req.auth.userId },
                { ...userObject, password: hash, _id: req.auth.userId }
              )
                .then(() =>
                  res.status(200).json({ message: "Account modified" })
                )
                .catch((error) => res.status(400).json({ error }));
            });
          }

          User.updateOne(
            { _id: req.auth.userId },
            { ...userObject, _id: req.auth.userId }
          )
            .then(() => {
              if (req.file) {
                const filename = user.userImage.split("/images/")[1];
                if (filename !== "profile.png") {
                  fs.unlink(`images/${filename}`, (err) => {
                    if (err) throw err;
                  });
                }
              }
              Post.updateMany(
                { userId: req.auth.userId },
                {
                  userFirstName: req.body.firstName,
                  userLastName: req.body.lastName,
                  userImage: userObject.userImage,
                }
              ).catch((error) => console.error({ error }));
            })
            .then(() =>
              res
                .status(200)
                .json({ message: "Account & user's posts modified" })
            )
            .catch((error) => res.status(400).json({ error }));
        })

        .catch((error) => {
          res.status(500).json({ error });
        })
    );
  } else {
    res.status(401).json({ message: "Not authorize" });
  }
};

exports.deleteProfile = (req, res, next) => {
  if (req.auth.userId === req.params.id) {
    User.findOne({ _id: req.auth.userId })
      .then((user) => {
        bcrypt.compare(req.body.password, user.password).then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: "Not authorize" });
          } else {
            const filename = user.userImage.split("/images/")[1];
            if (filename !== "profile.png") {
              fs.unlink(`images/${filename}`, () => {
                User.deleteOne({ _id: req.auth.userId })
                  .then(() =>
                    res.status(200).json({ message: "Account deleted" })
                  )
                  .catch((error) => res.status(400).json({ error }));
              });
            } else {
              User.deleteOne({ _id: req.auth.userId })
                .then(() =>
                  res.status(200).json({ message: "Account deleted" })
                )
                .catch((error) => res.status(400).json({ error }));
            }
          }
        });
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    res.status(401).json({ message: "Not Authorize" });
  }
};

exports.getProfile = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      const userProfile = {
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email,
        userImage: user.userImage,
      };
      res.status(200).json(userProfile);
    })
    .catch((error) => res.status(400).json({ error }));
};
